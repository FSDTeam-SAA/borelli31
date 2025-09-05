import express from 'express';
import authRoutes from '../../entities/auth/auth.routes.js';
import userRoutes from '../../entities/user/user.routes.js';
import serviceRoutes from '../../entities/service/service.routes.js';
import assessmentRoutes from '../../entities/assessment/assessment.routes.js';
import reviewRoutes from '../../entities/review/review.routes.js';
import messageRoutes from '../../entities/message/message.routes.js';
import { contractRouter } from '../../entities/contract/contract.router.js';

const router = express.Router();

router.use('/v1/auth', authRoutes);
router.use('/v1/user', userRoutes);
router.use('/v1/services', serviceRoutes);
router.use('/v1/assessments', assessmentRoutes);
router.use('/v1/reviews', reviewRoutes);
router.use('/v1/messages', messageRoutes);
router.use('/v1/contracts', contractRouter);

export default router;
