import express from 'express';
import { body } from 'express-validator';
import { createBucket, detailBucket, listBucket } from '../controller/storageController';

const router = express.Router();

router.get('/list-bucket',listBucket);

router.get('/detail-bucket/:bucketName',detailBucket);

router.post('/add-bucket', 
    body('bucket_name').isString().notEmpty(),
    createBucket);


export default router;