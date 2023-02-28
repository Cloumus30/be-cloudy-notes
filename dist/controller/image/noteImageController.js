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
exports.uploadNoteImage = void 0;
const noteImageRepository_1 = __importDefault(require("../../repository/image/noteImageRepository"));
const response_1 = require("../../config/response");
const noteImageRepository = new noteImageRepository_1.default();
const uploadNoteImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const body = req.body;
    const fileUpload = (_a = req.files) === null || _a === void 0 ? void 0 : _a.image;
    const data = yield noteImageRepository.createNoteImage(body, fileUpload);
    return (0, response_1.resController)(res, data);
});
exports.uploadNoteImage = uploadNoteImage;
