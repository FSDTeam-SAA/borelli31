import { generateResponse } from '../../lib/responseFormate.js'
import {
  createReviewService,
  listApprovedReviewsService,
  listReviewsService,
  updateReviewStatusService,
  deleteReviewService,
  reviewStatsService
} from './review.service.js'

export const createReview = async (req, res) => {
  try {
    const data = await createReviewService(req.body)
    generateResponse(res, 201, true, 'Review submitted', data)
  } catch (err) { generateResponse(res, 201, true, err.message, null)}
}

export const listApprovedReviews = async (req, res) => {
  try {
    const { page, limit } = req.query
    const data = await listApprovedReviewsService({ page, limit })
    generateResponse(res, 200, true, 'Approved reviews', data)
  } catch (err) { generateResponse(res, 201, true, err.message, null) }
}

export const listReviews = async (req, res) => {
  try {
    const { page, limit, status, search } = req.query
    const data = await listReviewsService({ page, limit, status, search })
    generateResponse(res, 200, true, 'Reviews fetched', data)
  } catch (err) {  generateResponse(res, 201, true, err.message, null) }
}

export const updateReviewStatus = async (req, res) => {
  try {
    const { status } = req.body
    const data = await updateReviewStatusService(req.params.id, status)
    generateResponse(res, 200, true, 'Review status updated', data)
  } catch (err) {  generateResponse(res, 201, true, err.message, null) }
}

export const deleteReview = async (req, res) => {
  try {
    const data = await deleteReviewService(req.params.id)
    generateResponse(res, 200, true, 'Review deleted', data)
  } catch (err) { generateResponse(res, 201, true, err.message, null)}
}

export const reviewStats = async (req, res) => {
  try {
    const data = await reviewStatsService()
    generateResponse(res, 200, true, 'Review stats', data)
  } catch (err) {  generateResponse(res, 201, true, err.message, null)}
}


