import Review, { ReviewStatus } from './review.model.js'
import { createPaginationInfo } from '../../lib/pagination.js'

export const createReviewService = async (payload) => {
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

export const listReviewsService = async ({ page = 1, limit = 25, status }) => {
  page = Number(page); limit = Number(limit)
  const filter = {}
  if (status) filter.status = status
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


