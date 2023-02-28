"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const storageController_1 = require("../controller/storageController");
const router = express_1.default.Router();
router.get('/list-bucket', storageController_1.listBucket);
router.get('/detail-bucket/:bucketName', storageController_1.detailBucket);
router.post('/add-bucket', (0, express_validator_1.body)('bucket_name').isString().notEmpty(), storageController_1.createBucket);
exports.default = router;
