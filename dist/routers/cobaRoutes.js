"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CobaController_1 = require("../controller/Coba/CobaController");
const router = express_1.default.Router();
router.get('/coba', CobaController_1.getUser);
exports.default = router;
