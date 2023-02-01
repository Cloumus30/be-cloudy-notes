import express from 'express';
import { getUser } from '../controller/Coba/CobaController';

const router = express.Router();

router.get('/coba',getUser);

export default router;