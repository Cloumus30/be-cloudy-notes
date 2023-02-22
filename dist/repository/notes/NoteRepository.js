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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const response_1 = require("../../config/response");
class NoteRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    list_notes(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = {
                    orderBy: {
                        id: 'desc'
                    },
                    select: {
                        id: true,
                        title: true,
                        user: {
                            select: {
                                id: true,
                                email: true,
                            }
                        },
                    }
                };
                const res = yield request.body.paginate(this.prisma.notes, query);
                return (0, response_1.successGetRepo)(res);
            }
            catch (error) {
                return (0, response_1.failedRepo)(error.message);
            }
        });
    }
    detail_notes(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const note = yield this.prisma.notes.findFirst({
                    where: {
                        id
                    },
                    include: {
                        user: true,
                    }
                });
                let res = null;
                if (note) {
                    res = {
                        id: note.id,
                        title: note.title,
                        short_desc: note.short_desc,
                        content: note.content,
                        user_id: note.user_id,
                        user_name: note.user.name,
                        created_at: note.created_at,
                    };
                }
                return (0, response_1.successGetRepo)(res);
            }
            catch (error) {
                return (0, response_1.failedRepo)(error.message);
            }
        });
    }
    store_note(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = body.user;
                const data_note = {
                    user_id: user.id,
                    title: body.title,
                    short_desc: body.short_desc || null,
                    content: body.content || null,
                };
                const res = yield this.prisma.notes.create({
                    data: data_note,
                });
                return (0, response_1.successSaveRepo)(res);
            }
            catch (error) {
                return {
                    error: true,
                    message: ` ⚠️ ${error.message}`,
                };
            }
        });
    }
    update_note(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = body.user;
                const data_note = {
                    title: body.title,
                    short_desc: body.title,
                    content: body.title,
                };
                const res = yield this.prisma.notes.update({
                    where: {
                        id
                    },
                    data: data_note
                });
                return (0, response_1.successUpdateRepo)();
            }
            catch (error) {
                return (0, response_1.failedRepo)(error.message);
            }
        });
    }
    delete_note(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = body.user;
                const note = yield this.prisma.notes.findFirst({
                    where: {
                        id,
                        user_id: user.id
                    }
                });
                if (note) {
                    yield this.prisma.notes.delete({
                        where: {
                            id: id,
                        }
                    });
                    return (0, response_1.successDeleteRepo)();
                }
                return (0, response_1.failedRepo)('Note Not Found');
            }
            catch (error) {
                return (0, response_1.failedRepo)(error.message);
            }
        });
    }
}
exports.default = NoteRepository;
