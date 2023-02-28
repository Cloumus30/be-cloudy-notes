import express from 'express';
import { body } from 'express-validator';
import { uploadNoteImage } from '../controller/image/noteImageController';
import { checkFile } from '../middleware/validator/checkFile';
import fileUpload from 'express-fileupload';
const router = express.Router();


router.post('/upload',
    fileUpload({
        useTempFiles:false,
        tempFileDir:'./public/temp',
        preserveExtension:true,
    }), 
    body('note_id').isNumeric(),
    checkFile('image'),
    uploadNoteImage);


export default router;