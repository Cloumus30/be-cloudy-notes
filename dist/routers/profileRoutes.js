"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
const router = express_1.default.Router();
router.get('/', UserController_1.getUser);
router.put('/', UserController_1.updateUser);
router.put('/pass', UserController_1.updateUserPass);
exports.default = router;
