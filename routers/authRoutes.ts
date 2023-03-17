import express from 'express';
import { checkEmail, login, register } from '../controller/AuthController';
import { body } from 'express-validator';
import { checkToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register',
    body('email').isEmail(),
    body('password').isString(),
    body('name').isString(),
    register);

router.post('/login',
    body('isis').isString(),
    login)

router.get('/check-email', checkEmail)

export default router;