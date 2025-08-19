import Message from './message.model.js'
import { createPaginationInfo } from '../../lib/pagination.js'

export const createMessageService = async (payload) => {
  const doc = await Message.create(payload)
  return doc
}

export const listMessagesService = async ({ page = 1, limit = 25 }) => {
  page = Number(page); limit = Number(limit)
  const [items, total] = await Promise.all([
    Message.find({}).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Message.countDocuments({})
  ])
  return { items, meta: createPaginationInfo(page, limit, total) }
}

export const getMessageByIdService = async (id) => {
  const doc = await Message.findById(id)
  return doc
}

export const deleteMessageService = async (id) => {
  await Message.findByIdAndDelete(id)
  return { deleted: true }
}


