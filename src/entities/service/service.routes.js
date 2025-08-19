import express from 'express'
import { adminMiddleware, verifyToken } from '../../core/middlewares/authMiddleware.js'
import { listServices, getServiceById, createService, updateService, deleteService } from './service.controller.js'

const router = express.Router()

// Public
router.get('/', listServices)
router.get('/:id', getServiceById)

// Admin
router.post('/', verifyToken, adminMiddleware, createService)
router.patch('/:id', verifyToken, adminMiddleware, updateService)
router.delete('/:id', verifyToken, adminMiddleware, deleteService)

export default router


