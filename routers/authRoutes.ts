import express from 'express';
import { login, register } from '../controller/AuthController';
import { body } from 'express-validator';
import { checkToken } from '../middleware/authMiddleware';

const router = express.Router();

router.use(checkToken);

router.post('/register',
    body('email').isEmail(),
    body('password').isString(),
    register);

router.post('/login',
    body('email').isEmail(),
    body('password').isString(),
    login)

export default router;