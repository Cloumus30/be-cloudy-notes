import express from 'express';
import { checkEmail, login, register, loginSosmed } from '../controller/AuthController';
import { body } from 'express-validator';
import { checkToken } from '../middleware/authMiddleware';
import { updateUser } from '../controller/UserController';

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
router.get('/check-email', checkEmail)

router.use(checkToken)
router.patch('/update-user', 
    body('name').isString(),
    body('gender').isString(),
    body('birth_date').isString(),
    body('email').isString().isEmail(),
    updateUser)

export default router;