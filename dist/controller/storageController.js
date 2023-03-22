"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBucket = exports.detailBucket = exports.listBucket = void 0;
const storageRepository_1 = __importDefault(require("../repository/storageRepository"));
const response_1 = require("../config/response");
const express_validator_1 = require("express-validator");
const storageRepository = new storageRepository_1.default();
const listBucket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield storageRepository.listBucket();
    (0, response_1.resController)(res, data);
});
exports.listBucket = listBucket;
const detailBucket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bucketName = req.params.bucketName;
    const data = yield storageRepository.detailBucket(bucketName);
    (0, response_1.resController)(res, data);
});
exports.detailBucket = detailBucket;
const createBucket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body;
    const data = yield storageRepository.createBucket(body.bucket_name);
    (0, response_1.resController)(res, data);
});
exports.createBucket = createBucket;
