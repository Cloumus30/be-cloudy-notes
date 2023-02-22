"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const noteController_1 = require("../controller/notes/noteController");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router.get('/list', noteController_1.listNote);
router.get('/detail/:id', noteController_1.detailNote);
router.post('/save', (0, express_validator_1.body)('title').isString(), (0, express_validator_1.body)('content').isEmpty(), noteController_1.storeNote);
router.patch('/update/:id', (0, express_validator_1.body)('title').isString(), (0, express_validator_1.body)('content').isEmpty(), noteController_1.updateNote);
router.delete('/delete/:id', noteController_1.deleteNote);
exports.default = router;
