"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controller/AuthController");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router.post('/register', (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isString(), (0, express_validator_1.body)('name').isString(), AuthController_1.register);
router.post('/login', (0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isString(), AuthController_1.login);
exports.default = router;
