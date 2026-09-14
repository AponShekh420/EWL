import { Router } from 'express';
import {
  getConferences,
  createConference,
  updateConference,
  deleteConference,
} from '../controllers/home/conference/conferenceController';

const router = Router();

router.get('/conference/', getConferences);
router.post('/conference/', createConference);
router.put('/conference/:id', updateConference);
router.delete('/conference/:id', deleteConference);

export default router;