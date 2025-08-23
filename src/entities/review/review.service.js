import Review, { ReviewStatus } from './review.model.js'
import { createPaginationInfo } from '../../lib/pagination.js'

export const createReviewService = async (payload) => {
  const existing = await Review.findOne({ email: payload.email })
  if (existing) throw new Error('Only one review is allowed per user.')
  const doc = await Review.create(payload)
  return doc
}

export const listApprovedReviewsService = async ({ page = 1, limit = 10 }) => {
  page = Number(page); limit = Number(limit)
  const filter = { status: ReviewStatus.APPROVED }
  const [items, total] = await Promise.all([
    Review.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Review.countDocuments(filter)
  ])
  return { items, meta: createPaginationInfo(page, limit, total) }
}

export const listReviewsService = async ({ page = 1, limit = 25, status, search }) => {
  page = Number(page); limit = Number(limit)
  const filter = {}
  if (status) filter.status = status
  if (search) {
    const regex = new RegExp(search, 'i')
    const maybeRating = Number(search)
    const or = [
      { fullName: { $regex: regex } },
      { email: { $regex: regex } },
      { description: { $regex: regex } },
    ]
    if (!Number.isNaN(maybeRating) && maybeRating >= 1 && maybeRating <= 5) {
      or.push({ rating: maybeRating })
    }
    filter.$or = or
  }
  const [items, total] = await Promise.all([
    Review.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Review.countDocuments(filter)
  ])
  return { items, meta: createPaginationInfo(page, limit, total) }
}

export const updateReviewStatusService = async (id, status) => {
  const doc = await Review.findByIdAndUpdate(id, { status }, { new: true })
  return doc
}

export const deleteReviewService = async (id) => {
  await Review.findByIdAndDelete(id)
  return { deleted: true }
}

export const reviewStatsService = async () => {
  const pipeline = [
    { $match: { status: ReviewStatus.APPROVED } },
    { $group: { _id: '$rating', count: { $sum: 1 } } },
    {
      $group: {
        _id: null,
        total: { $sum: '$count' },
        sumWeighted: { $sum: { $multiply: ['$_id', '$count'] } },
        counts: { $push: { k: { $toString: '$_id' }, v: '$count' } }
      }
    },
    {
      $project: {
        _id: 0,
        total: 1,
        average: {
          $cond: [
            { $gt: ['$total', 0] },
            { $divide: ['$sumWeighted', '$total'] },
            0
          ]
        },
        countsObj: { $arrayToObject: '$counts' }
      }
    }
  ]

  const [row] = await Review.aggregate(pipeline)
  const baseCounts = { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 }
  const countsObj = Object.assign(baseCounts, row?.countsObj || {})
  return {
    average: row?.average || 0,
    total: row?.total || 0,
    counts: {
      5: countsObj['5'],
      4: countsObj['4'],
      3: countsObj['3'],
      2: countsObj['2'],
      1: countsObj['1']
    }
  }
}


