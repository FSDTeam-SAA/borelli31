import { generateResponse } from '../../lib/responseFormate.js'
import {
  listServicesService,
  getServiceByIdService,
  createServiceService,
  updateServiceService,
  deleteServiceService
} from './service.service.js'
import { cloudinaryUpload } from '../../lib/cloudinaryUpload.js'

export const listServices = async (req, res, next) => {
  try {
    const { category } = req.query
    const data = await listServicesService({ category })
    generateResponse(res, 200, true, 'Services fetched', data)
  } catch (err) { next(err) }
}

export const getServiceById = async (req, res, next) => {
  try {
    const data = await getServiceByIdService(req.params.id)
    generateResponse(res, 200, true, 'Service fetched', data)
  } catch (err) { next(err) }
}

export const createService = async (req, res, next) => {
  try {
    const data = await createServiceService(req.body)
    generateResponse(res, 201, true, 'Service created', data)
  } catch (err) { next(err) }
}

export const updateService = async (req, res, next) => {
  try {
    if (
      req.files &&
      req.files.thumbnail &&
      req.files.thumbnail[0] &&
      req.files.thumbnail[0].path
    ) {
      const filePath = req.files.thumbnail[0].path
      const upload = await cloudinaryUpload(
        filePath,
        `service-${req.params.id}-${Date.now()}`,
        'services'
      )

      if (upload && (upload.secure_url || upload.url)) {
        req.body.imageUrl = upload.secure_url || upload.url
      }
    }

    const data = await updateServiceService(req.params.id, req.body)
    generateResponse(res, 200, true, 'Service updated', data)
  } catch (err) { next(err) }
}

export const deleteService = async (req, res, next) => {
  try {
    const data = await deleteServiceService(req.params.id)
    generateResponse(res, 200, true, 'Service deleted', data)
  } catch (err) { next(err) }
}


