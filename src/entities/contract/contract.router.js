import { Router } from 'express';
import contractController from './contract.controller.js';

const router = Router();

router.post('/send-message', contractController.sendMessage);

export const contractRouter = router;
