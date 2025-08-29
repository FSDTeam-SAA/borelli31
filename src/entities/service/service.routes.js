import express from 'express'
import { adminMiddleware, verifyToken } from '../../core/middlewares/authMiddleware.js'
import { listServices, getServiceById, createService, updateService, deleteService } from './service.controller.js'
import { multerUpload } from '../../core/middlewares/multer.js';

const router = express.Router()

// Public
router.get('/', listServices)
router.get('/:id', getServiceById)

router.use(verifyToken, adminMiddleware)
// Admin
router.post('/', multerUpload([{ name: 'thumbnail', maxCount: 1 }]), createService)
router.patch('/:id', multerUpload([{ name: 'thumbnail', maxCount: 1 }]), updateService)
router.delete('/:id', deleteService)

export default router


