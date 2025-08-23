import express from 'express'
import { verifyToken, adminMiddleware } from '../../core/middlewares/authMiddleware.js'
import { createAssessment, getAssessmentById, listAssessments, updateAssessmentStatus, assessmentStats, downloadAssessment, assessmentTimelineStats } from './assessment.controller.js'


const router = express.Router()

// Public
router.post('/', createAssessment)

// router.use(verifyToken, adminMiddleware)
// Admin
router.get('/stats', assessmentStats)
router.get('/stats/timeline', assessmentTimelineStats) 
router.get('/', listAssessments)
router.get('/:id', getAssessmentById)
router.get('/:id/download', verifyToken, adminMiddleware, downloadAssessment)
router.patch('/:id/status', updateAssessmentStatus)


export default router


