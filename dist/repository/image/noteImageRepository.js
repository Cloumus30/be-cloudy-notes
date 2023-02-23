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
const client_1 = require("@prisma/client");
const response_1 = require("../../config/response");
const noteImage_dto_1 = require("../../prisma/dto/noteImage.dto");
const uniqid_1 = __importDefault(require("uniqid"));
class NoteImageRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    createNoteImage(body, file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = body.user;
                const note = yield this.prisma.notes.findFirst({
                    where: {
                        id: body.note_id,
                    }
                });
                if (!note) {
                    return (0, response_1.failedRepo)('Note Not Found', 404);
                }
                const path = `${noteImage_dto_1.noteImageRootPath}/${user.id}/`;
                const fileUpload = yield this.uploadImage(file, path);
                const data_image = {
                    note_id: note.id,
                    path: fileUpload.path,
                    size: fileUpload.size,
                    mime_type: fileUpload.mime_type,
                };
                const noteImage = yield this.prisma.noteImages.create({
                    data: data_image
                });
                return (0, response_1.successSaveRepo)(noteImage);
            }
            catch (error) {
                return (0, response_1.failedRepo)(error.message);
            }
        });
    }
    uploadImage(file, path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const originalName = file.name;
                const extension = originalName.match(/\.[0-9a-z]+$/i);
                const fileName = (0, uniqid_1.default)() + extension;
                const fullPath = `${path}/${fileName}`;
                const fileUpload = yield file.mv(fullPath);
                return {
                    path,
                    size: file.size,
                    mime_type: file.mimetype,
                };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.default = NoteImageRepository;
