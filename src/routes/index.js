import { Router } from 'express';
import songs from './songs';

const router = new Router();

router.use('/songs', songs);

export default router;
