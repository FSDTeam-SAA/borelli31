import express from 'express'
import { verifyToken, adminMiddleware } from '../../core/middlewares/authMiddleware.js'
import { createMessage, listMessages, getMessageById, deleteMessage, downloadMessage } from './message.controller.js'

const router = express.Router()

// Public
router.post('/', createMessage)

// Admin
router.get('/', verifyToken, adminMiddleware, listMessages)
router.get('/:id', verifyToken, adminMiddleware, getMessageById)
router.get('/:id/download', verifyToken, adminMiddleware, downloadMessage)
router.delete('/:id', verifyToken, adminMiddleware, deleteMessage)

export default router


