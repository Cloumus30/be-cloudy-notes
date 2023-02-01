import express from 'express';
import { login, register } from '../controller/AuthController';
import { body } from 'express-validator';

const router = express.Router();

router.post('/register',
    body('email').isEmail(),
    body('password').isString(),
    register);

router.post('/login',
    body('email').isEmail(),
    body('password').isString(),
    login)

export default router;