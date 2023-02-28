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
exports.deleteNote = exports.updateNote = exports.storeNote = exports.detailNote = exports.listNote = void 0;
const NoteRepository_1 = __importDefault(require("../../repository/notes/NoteRepository"));
const response_1 = require("../../config/response");
const noteRepository = new NoteRepository_1.default();
const listNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield noteRepository.list_notes(req);
    (0, response_1.resController)(res, data);
});
exports.listNote = listNote;
const detailNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const data = yield noteRepository.detail_notes(id);
    if (data.error) {
        console.error(data.message);
        res.status(400).json(data);
    }
    else {
        res.status(200).json(data);
    }
});
exports.detailNote = detailNote;
const storeNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const data = yield noteRepository.store_note(body);
    (0, response_1.resController)(res, data);
});
exports.storeNote = storeNote;
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const id = parseInt(req.params.id);
    const data = yield noteRepository.update_note(id, body);
    (0, response_1.resController)(res, data);
});
exports.updateNote = updateNote;
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const id = parseInt(req.params.id);
    const data = yield noteRepository.delete_note(id, body);
    (0, response_1.resController)(res, data);
});
exports.deleteNote = deleteNote;
