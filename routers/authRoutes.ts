import express from 'express';
import { login, loginSosmed, register } from '../controller/AuthController';
import { body } from 'express-validator';
import { checkToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register',
    body('email').isEmail(),
    body('password').isString(),
    body('name').isString(),
    register);

router.post('/login',
    body('email').isEmail(),
    body('password').isString(),
    login)

router.post('/login-sosmed', loginSosmed)

export default router;