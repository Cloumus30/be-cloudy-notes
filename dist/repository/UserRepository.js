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
const user_dto_1 = require("../prisma/dto/user.dto");
const response_1 = require("../config/response");
class UserRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    getOneUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.prisma.user.findFirst({
                where: {
                    id
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                }
            });
            return users;
        });
    }
    getOneUserDetail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.prisma.user.findFirst({
                where: {
                    id
                }
            });
            const res = {
                id: users === null || users === void 0 ? void 0 : users.id,
                email: users === null || users === void 0 ? void 0 : users.email,
                name: users === null || users === void 0 ? void 0 : users.name,
                birth_date: users === null || users === void 0 ? void 0 : users.birth_date,
                isPassword: (((users === null || users === void 0 ? void 0 : users.password) == '') || ((users === null || users === void 0 ? void 0 : users.password) == null)) ? false : true,
            };
            return res;
        });
    }
    updateUser(userId, request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const birthDate = request.birth_date || null;
                if (birthDate !== null) {
                    request.birth_date = new Date(birthDate);
                }
                const user = yield this.prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: request
                });
                const result = (0, user_dto_1.excludeUser)(user, ['password']);
                return (0, response_1.successSaveRepo)(result);
            }
            catch (error) {
                if (error.code == 'P2002') {
                    return (0, response_1.failedRepo)('Email Sudah Terdaftar');
                }
                return (0, response_1.failedRepo)(error.message);
            }
        });
    }
    updateUserPassword(userId, request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: request
                });
                const result = {
                    id: user === null || user === void 0 ? void 0 : user.id,
                    email: user === null || user === void 0 ? void 0 : user.email,
                    name: user === null || user === void 0 ? void 0 : user.name,
                    birth_date: user === null || user === void 0 ? void 0 : user.birth_date,
                    isPassword: (((user === null || user === void 0 ? void 0 : user.password) == '') || ((user === null || user === void 0 ? void 0 : user.password) == null)) ? false : true,
                };
                return (0, response_1.successSaveRepo)(result);
            }
            catch (error) {
                if (error.code == 'P2002') {
                    return (0, response_1.failedRepo)('Email Sudah Terdaftar');
                }
                return (0, response_1.failedRepo)(error.message);
            }
        });
    }
}
exports.default = UserRepository;
