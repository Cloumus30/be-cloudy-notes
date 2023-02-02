import express from 'express';
import { listNote } from '../controller/notes/noteController';
const router = express.Router();

router.get('/list', listNote);

export default router;