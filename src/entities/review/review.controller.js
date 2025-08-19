import { generateResponse } from '../../lib/responseFormate.js'
import {
  createReviewService,
  listApprovedReviewsService,
  listReviewsService,
  updateReviewStatusService,
  deleteReviewService
} from './review.service.js'

export const createReview = async (req, res, next) => {
  try {
    const data = await createReviewService(req.body)
    generateResponse(res, 201, true, 'Review submitted', data)
  } catch (err) { next(err) }
}

export const listApprovedReviews = async (req, res, next) => {
  try {
    const { page, limit } = req.query
    const data = await listApprovedReviewsService({ page, limit })
    generateResponse(res, 200, true, 'Approved reviews', data)
  } catch (err) { next(err) }
}

export const listReviews = async (req, res, next) => {
  try {
    const { page, limit, status } = req.query
    const data = await listReviewsService({ page, limit, status })
    generateResponse(res, 200, true, 'Reviews fetched', data)
  } catch (err) { next(err) }
}

export const updateReviewStatus = async (req, res, next) => {
  try {
    const { status } = req.body
    const data = await updateReviewStatusService(req.params.id, status)
    generateResponse(res, 200, true, 'Review status updated', data)
  } catch (err) { next(err) }
}

export const deleteReview = async (req, res, next) => {
  try {
    const data = await deleteReviewService(req.params.id)
    generateResponse(res, 200, true, 'Review deleted', data)
  } catch (err) { next(err) }
}


