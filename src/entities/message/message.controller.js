import { generateResponse } from '../../lib/responseFormate.js'
import { createMessageService, listMessagesService, getMessageByIdService, deleteMessageService } from './message.service.js'

export const createMessage = async (req, res, next) => {
  try {
    const data = await createMessageService(req.body)
    generateResponse(res, 201, true, 'Message received', data)
  } catch (err) { next(err) }
}

export const listMessages = async (req, res, next) => {
  try {
    const { page, limit } = req.query
    const data = await listMessagesService({ page, limit })
    generateResponse(res, 200, true, 'Messages fetched', data)
  } catch (err) { next(err) }
}

export const getMessageById = async (req, res, next) => {
  try {
    const data = await getMessageByIdService(req.params.id)
    generateResponse(res, 200, true, 'Message fetched', data)
  } catch (err) { next(err) }
}

export const deleteMessage = async (req, res, next) => {
  try {
    const data = await deleteMessageService(req.params.id)
    generateResponse(res, 200, true, 'Message deleted', data)
  } catch (err) { next(err) }
}


