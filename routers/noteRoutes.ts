import express from 'express';
import { detailNote, listNote, storeNote } from '../controller/notes/noteController';
import { body } from 'express-validator';
const router = express.Router();


router.get('/list', listNote);
router.get('/detail/:id', detailNote);
router.post('/save', 
    body('title').isString(),
    body('content').isEmpty(),
    storeNote);

export default router;