import Assessment from './assessment.model.js'
import Service from '../service/service.model.js'
import { createPaginationInfo } from '../../lib/pagination.js'

export const createAssessmentService = async (payload) => {
  const { service: serviceId, fullName, email, phone, propertyAddress } = payload
  if (!serviceId) {
    throw new Error('Service id is required')
  }

  const serviceDoc = await Service.findById(serviceId)
  if (!serviceDoc) {
    throw new Error('Service not found')
  }

  // If same user (by email) requests assessment for same service, return latest existing
  const existing = await Assessment.findOne({ email, service: serviceDoc._id }).sort({ createdAt: -1 })
  if (existing) {
    return { doc: existing, existed: true }
  }

  const doc = await Assessment.create({
    fullName,
    email,
    phone,
    propertyAddress,
    service: serviceDoc._id,
    category: serviceDoc.category
  })
  return { doc, existed: false }
}

export const getAssessmentByIdService = async (id) => {
  const doc = await Assessment.findById(id).populate('service')
  return doc
}

export const listAssessmentsService = async ({ page = 1, limit = 25, status, category, search }) => {
  page = Number(page); limit = Number(limit)
  const filter = {}
  if (status) filter.status = status
  if (category) filter.category = category
  if (search) filter.$or = [
    { fullName: { $regex: search, $options: 'i' } },
    { email: { $regex: search, $options: 'i' } },
    { phone: { $regex: search, $options: 'i' } },
  ]

  const [items, total] = await Promise.all([
    Assessment.find(filter).populate('service').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Assessment.countDocuments(filter)
  ])

  return { items, meta: createPaginationInfo(page, limit, total) }
}

export const updateAssessmentStatusService = async (id, status) => {
  const ALLOWED_STATUSES = ['PENDING', 'IN_PROGRESS', 'COMPLETED']
  if (!ALLOWED_STATUSES.includes(status)) {
    const err = new Error('Invalid status. Allowed: PENDING, IN_PROGRESS, COMPLETED')
    err.statusCode = 400
    throw err
  }

  const doc = await Assessment.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  )
  return doc
}

export const assessmentStatsService = async () => {
  const [total, pending, inProgress, completed] = await Promise.all([
    Assessment.countDocuments({}),
    Assessment.countDocuments({ status: 'PENDING' }),
    Assessment.countDocuments({ status: 'IN_PROGRESS' }),
    Assessment.countDocuments({ status: 'COMPLETED' })
  ])
  return { total, pending, inProgress, completed }
}





//statistic timeline
export const getAssessmentTimelineService = async (period = '12m') => {
  const now = new Date();
  let startDate;
  let groupByFormat;
  let allLabels = [];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // 1. Determine date range and label format based on the period
  switch (period) {
    case '6m':
      startDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
      groupByFormat = '%b'; // Group by short month name (e.g., 'Jan')
      for (let i = 5; i >= 0; i--) {
        allLabels.push(monthNames[(now.getMonth() - i + 12) % 12]);
      }
      break;
    case '30d':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 29);
      groupByFormat = '%Y-%m-%d'; // Group by day
      for (let i = 29; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        allLabels.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
      }
      break;
    case '7d':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
        groupByFormat = '%Y-%m-%d'; // Group by day
        for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setDate(d.getDate() - i);
          allLabels.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`);
        }
        break;
    case '12m':
    default:
      startDate = new Date(now.getFullYear(), now.getMonth() - 11, 1);
      groupByFormat = '%b'; // Group by short month name
      for (let i = 11; i >= 0; i--) {
        allLabels.push(monthNames[(now.getMonth() - i + 12) % 12]);
      }
      break;
  }

  // 2. Build and execute the MongoDB Aggregation Pipeline
  const pipeline = [
    // Stage 1: Filter documents to only include 'COMPLETED' assessments within the date range
    {
      $match: {
        status: 'COMPLETED',
        createdAt: { $gte: startDate }
      }
    },
    // Stage 2: Group the documents by the calculated time period (month or day)
    {
      $group: {
        _id: { $dateToString: { format: groupByFormat, date: '$createdAt' } },
        count: { $sum: 1 }
      }
    },
    // Stage 3: Make the output cleaner
    {
        $project: {
            _id: 0,
            label: '$_id',
            count: 1
        }
    }
  ];

  const dbResults = await Assessment.aggregate(pipeline);

  // 3. Map database results and fill in zeros for periods with no data
  const resultsMap = new Map(dbResults.map(item => [item.label, item.count]));
  
  const finalData = allLabels.map(label => ({
    label: label,
    count: resultsMap.get(label) || 0
  }));

  return finalData;
}