import express from 'express';
import { listNote, storeNote } from '../controller/notes/noteController';
import { body } from 'express-validator';
const router = express.Router();


router.get('/list', listNote);
router.post('/save', 
    body('title').isString(),
    body('content').isEmpty(),
    storeNote);

export default router;