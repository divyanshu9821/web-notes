import express from 'express';
import * as notes from './controller/notes.mjs';

const router = express.Router();

router.get('/', notes.send_view);
router.get('/note', notes.read_note);
router.post('/note', notes.create_note);
router.put('/note', notes.update_note);
router.delete('/note', notes.delete_note);

export default router;