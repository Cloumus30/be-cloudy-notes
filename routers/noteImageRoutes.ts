import express from 'express';
import { deleteNote, detailNote, listNote, storeNote, updateNote } from '../controller/notes/noteController';
import { body } from 'express-validator';
import { uploadNoteImage } from '../controller/image/noteImageController';
import { checkFile } from '../middleware/validator/checkFile';
const router = express.Router();


router.post('/upload', 
    body('note_id').isNumeric(),
    checkFile('image'),
    uploadNoteImage);


export default router;