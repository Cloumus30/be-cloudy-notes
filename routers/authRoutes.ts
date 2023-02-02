import express from 'express';
import { login, register } from '../controller/AuthController';
import { body } from 'express-validator';
import { checkToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register',
    body('email').isEmail(),
    body('password').isString(),
    body('first_name').isString(),
    body('last_name').isString(),
    register);

router.post('/login',
    body('email').isEmail(),
    body('password').isString(),
    login)

export default router;