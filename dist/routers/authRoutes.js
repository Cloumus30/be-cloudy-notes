"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controller/AuthController");
const express_validator_1 = require("express-validator");
const authMiddleware_1 = require("../middleware/authMiddleware");
const UserController_1 = require("../controller/UserController");
const router = express_1.default.Router();
router.post('/register', (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isString(), (0, express_validator_1.body)('name').isString(), AuthController_1.register);
router.post('/login', (0, express_validator_1.body)('isis').isString(), AuthController_1.login);
router.post('/login-sosmed', AuthController_1.loginSosmed);
router.get('/check-email', AuthController_1.checkEmail);
router.use(authMiddleware_1.checkToken);
router.patch('/update-user', (0, express_validator_1.body)('name').isString(), (0, express_validator_1.body)('gender').isString(), (0, express_validator_1.body)('birth_date').isString(), (0, express_validator_1.body)('email').isString().isEmail(), UserController_1.updateUser);
exports.default = router;
