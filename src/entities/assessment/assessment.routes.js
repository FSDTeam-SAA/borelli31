import express from 'express'
import { verifyToken, adminMiddleware } from '../../core/middlewares/authMiddleware.js'
import { createAssessment, getAssessmentById, listAssessments, updateAssessmentStatus, assessmentStats } from './assessment.controller.js'

const router = express.Router()

// Public
router.post('/', createAssessment)

// Admin
router.get('/stats', verifyToken, adminMiddleware, assessmentStats)
router.get('/', verifyToken, adminMiddleware, listAssessments)
router.get('/:id', verifyToken, adminMiddleware, getAssessmentById)
router.patch('/:id/status', verifyToken, adminMiddleware, updateAssessmentStatus)

export default router


