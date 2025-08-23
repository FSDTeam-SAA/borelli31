import express from 'express'
import { verifyToken, adminMiddleware } from '../../core/middlewares/authMiddleware.js'
import { createReview, listApprovedReviews, listReviews, updateReviewStatus, deleteReview, reviewStats } from './review.controller.js'

const router = express.Router()

// Public
router.post('/', createReview)
router.get('/approved', listApprovedReviews)
router.get('/stats', reviewStats)

// Admin
router.get('/', verifyToken, adminMiddleware, listReviews)
router.patch('/:id/status', verifyToken, adminMiddleware, updateReviewStatus)
router.delete('/:id', verifyToken, adminMiddleware, deleteReview)

export default router


