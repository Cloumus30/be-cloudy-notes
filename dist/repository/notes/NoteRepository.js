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
class NoteRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    list_notes(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield request.body.paginate(this.prisma.notes, { orderBy: { id: 'desc' } });
                return {
                    error: false,
                    message: ` success Get`,
                    data: res
                };
            }
            catch (error) {
                return {
                    error: true,
                    message: ` ⚠️ ${error.message}`,
                };
            }
        });
    }
}
exports.default = NoteRepository;
