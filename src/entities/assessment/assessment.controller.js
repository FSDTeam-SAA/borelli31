import { generateResponse } from '../../lib/responseFormate.js'
import {
  createAssessmentService,
  getAssessmentByIdService,
  listAssessmentsService,
  updateAssessmentStatusService,
  assessmentStatsService
} from './assessment.service.js'

export const createAssessment = async (req, res, next) => {
  try {
    const data = await createAssessmentService(req.body)
    generateResponse(res, 201, true, 'Assessment inquiry created', data)
  } catch (err) { next(err) }
}

export const getAssessmentById = async (req, res, next) => {
  try {
    const data = await getAssessmentByIdService(req.params.id)
    generateResponse(res, 200, true, 'Assessment fetched', data)
  } catch (err) { next(err) }
}

export const listAssessments = async (req, res, next) => {
  try {
    const { page, limit, status, category, search } = req.query
    const data = await listAssessmentsService({ page, limit, status, category, search })
    generateResponse(res, 200, true, 'Assessments fetched', data)
  } catch (err) { next(err) }
}

export const updateAssessmentStatus = async (req, res, next) => {
  try {
    const { status } = req.body
    const data = await updateAssessmentStatusService(req.params.id, status)
    generateResponse(res, 200, true, 'Assessment status updated', data)
  } catch (err) { next(err) }
}

export const assessmentStats = async (req, res, next) => {
  try {
    const data = await assessmentStatsService()
    generateResponse(res, 200, true, 'Assessment stats', data)
  } catch (err) { next(err) }
}


