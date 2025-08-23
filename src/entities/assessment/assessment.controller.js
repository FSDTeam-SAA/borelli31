import { generateResponse } from '../../lib/responseFormate.js'
import {
  createAssessmentService,
  getAssessmentByIdService,
  listAssessmentsService,
  updateAssessmentStatusService,
  assessmentStatsService,
  getAssessmentTimelineService
} from './assessment.service.js'
import { generateAssessmentPdf } from '../../lib/pdf.js'

export const createAssessment = async (req, res) => {
  try {
    const { doc, existed } = await createAssessmentService(req.body)
    if (existed) {
      generateResponse(res, 200, true, `Existing assessment found (status: ${doc.status})`,null)
    } else {
      generateResponse(res, 201, true, 'Assessment inquiry created', doc)
    }
  } catch (err) { generateResponse(res, 500, false, err.message, null) }
}

export const getAssessmentById = async (req, res) => {
  try {
    const data = await getAssessmentByIdService(req.params.id)
    generateResponse(res, 200, true, 'Assessment fetched', data)
  } catch (err) { generateResponse(res, 500, false, err.message, null) }
}

export const listAssessments = async (req, res) => {
  try {
    const { page, limit, status, category, search } = req.query
    const data = await listAssessmentsService({ page, limit, status, category, search })
    generateResponse(res, 200, true, 'Assessments fetched', data)
  } catch (err) { generateResponse(res, 500, false, err.message, null) }
}

export const updateAssessmentStatus = async (req, res) => {
  try {
    const { status } = req.body
    const data = await updateAssessmentStatusService(req.params.id, status)
    generateResponse(res, 200, true, 'Assessment status updated', data)
  } catch (err) { generateResponse(res, 500, false, err.message, null) }
}

export const assessmentStats = async (req, res) => {
  try {
    const data = await assessmentStatsService()
    generateResponse(res, 200, true, 'Assessment stats', data)
  } catch (err) {  generateResponse(res, 200, true, err.message, null) }
}

export const downloadAssessment = async (req, res) => {
  try {
    const doc = await getAssessmentByIdService(req.params.id)
    if (!doc) return generateResponse(res, 404, false, 'Assessment not found', null)
    generateAssessmentPdf(doc, res)
  } catch (err) { generateResponse(res, 500, false, err.message, null) }
}



// vvv ADD THIS NEW CONTROLLER FUNCTION vvv
export const assessmentTimelineStats = async (req, res) => {
  try {
    // We get the desired period from the query string (e.g., ?period=12m)
    const { period } = req.query
    const data = await getAssessmentTimelineService(period)
    generateResponse(res, 200, true, 'Assessment timeline stats fetched', data)
  } catch (err) { 
    generateResponse(res, 500, false, err.message, null) 
  }
}

