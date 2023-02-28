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
const supabase_js_1 = require("@supabase/supabase-js");
class NoteImageRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
        this.supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
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
                    return (0, response_1.failedRepo)('Note Not Found');
                }
                const path = `${noteImage_dto_1.noteImageRootPath}`;
                const bucketName = `${user.id}-${user.name}`;
                const fileUpload = yield this.uploadImage(file, path, bucketName);
                const data_image = {
                    note_id: note.id,
                    path: fileUpload.path,
                    size: fileUpload.size,
                    mime_type: fileUpload.mime_type,
                };
                const noteImage = yield this.prisma.noteImages.create({
                    data: data_image
                });
                const res = Object.assign(Object.assign({}, noteImage), { url: fileUpload.url });
                return (0, response_1.successSaveRepo)(res);
            }
            catch (error) {
                return (0, response_1.failedRepo)(error.message);
            }
        });
    }
    uploadImage(file, path, bucketName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const originalName = file.name;
                const extension = originalName.match(/\.[0-9a-z]+$/i);
                const fileName = (0, uniqid_1.default)() + extension;
                const fullPath = `${path}/${fileName}`;
                const { data, error } = yield this.supabase.storage.from(bucketName).upload(fullPath, file.data, { contentType: 'File' });
                if (error) {
                    console.log(error);
                    throw new Error(error.message);
                }
                const url = yield this.supabase.storage.from(bucketName).getPublicUrl(fullPath);
                return {
                    path: fullPath,
                    size: file.size,
                    mime_type: file.mimetype,
                    url: url.data.publicUrl,
                };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.default = NoteImageRepository;
