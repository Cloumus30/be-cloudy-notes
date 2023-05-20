import express from 'express'
import { getUser, updateUser, updateUserPass } from '../controller/UserController';

const router = express.Router();


router.get('/', getUser);
router.put('/', updateUser);
router.put('/pass', updateUserPass);

export default router