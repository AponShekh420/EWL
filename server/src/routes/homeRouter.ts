import { Router } from 'express';
import {
  getConferences,
  createConference,
  updateConference,
  deleteConference,
} from '../controllers/home/conference/conferenceController';
import { getCounterStats, updateCounterStats } from '../controllers/home/conference/counterController';

const router = Router();

router.get('/conference/', getConferences);
router.post('/conference/', createConference);
router.put('/conference/:id', updateConference);
router.delete('/conference/:id', deleteConference);

// counter
router.get('/counter-stats', getCounterStats);
router.put('/counter-stats', updateCounterStats);

export default router;