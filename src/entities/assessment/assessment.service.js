import Assessment, { AssessmentStatus } from './assessment.model.js'
import { createPaginationInfo } from '../../lib/pagination.js'

export const createAssessmentService = async (payload) => {
  const doc = await Assessment.create(payload)
  return doc
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
  const doc = await Assessment.findByIdAndUpdate(id, { status }, { new: true })
  return doc
}

export const assessmentStatsService = async () => {
  const [total, pending, inProgress, completed] = await Promise.all([
    Assessment.countDocuments({}),
    Assessment.countDocuments({ status: AssessmentStatus.PENDING }),
    Assessment.countDocuments({ status: AssessmentStatus.IN_PROGRESS }),
    Assessment.countDocuments({ status: AssessmentStatus.COMPLETED })
  ])
  return { total, pending, inProgress, completed }
}


