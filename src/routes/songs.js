import { Router } from 'express';
import songsController from '../controllers/songs.controller';

const router = new Router();

// GET /songs
router.get('/', songsController.findAll);

// GET /songs/:id
router.get('/:id', songsController.findOne);

// POST /songs
router.post('/', songsController.create);

// POST /songs/:id
router.put('/:id', songsController.update);

// DELETE /songs/:id
router.delete('/:id', songsController.remove);

export default router;
