"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const noteImageController_1 = require("../controller/image/noteImageController");
const checkFile_1 = require("../middleware/validator/checkFile");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const router = express_1.default.Router();
router.post('/upload', (0, express_fileupload_1.default)({
    useTempFiles: false,
    tempFileDir: './public/temp',
    preserveExtension: true,
}), (0, express_validator_1.body)('note_id').isNumeric(), (0, checkFile_1.checkFile)('image'), noteImageController_1.uploadNoteImage);
exports.default = router;
