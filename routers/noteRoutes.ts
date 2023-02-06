import express from 'express';
import { detailNote, listNote, storeNote, updateNote } from '../controller/notes/noteController';
import { body } from 'express-validator';
const router = express.Router();


router.get('/list', listNote);
router.get('/detail/:id', detailNote);
router.post('/save', 
    body('title').isString(),
    body('content').isEmpty(),
    storeNote);
router.patch('/update/:id', 
    body('title').isString(),
    body('content').isEmpty(),
    updateNote);


export default router;