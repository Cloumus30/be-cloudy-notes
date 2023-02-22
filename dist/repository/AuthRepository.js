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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const roleConst_1 = __importDefault(require("../const/roleConst"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_dto_1 = require("../prisma/dto/user.dto");
const response_1 = require("../config/response");
class AuthRepository {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    login(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.prisma.user.findFirst({
                    where: {
                        email: request.email,
                    },
                    include: {
                        role: true,
                    }
                });
                if (!user) {
                    return (0, response_1.failedRepo)('User Not Found');
                }
                const authenticated = yield bcryptjs_1.default.compare(request.password, user.password);
                if (authenticated) {
                    const payload = {
                        'sub': user.id,
                        'role': user.role,
                    };
                    const jwtSecret = process.env.JWT_SECRET || " ";
                    const token = jsonwebtoken_1.default.sign(payload, jwtSecret);
                    const resp = {
                        access_key: token,
                        user: {
                            email: user.email,
                        },
                        role: user.role,
                    };
                    return (0, response_1.successLogin)(resp);
                }
                return (0, response_1.failedRepo)('User or Password incorrect');
            }
            catch (error) {
                return (0, response_1.failedRepo)(error.message);
            }
        });
    }
    register(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcryptjs_1.default.genSalt(8);
                const hashedPassword = yield bcryptjs_1.default.hash(request.password, salt);
                const dataUser = {
                    name: request.name,
                    gender: request.gender,
                    birth_date: new Date(request.birth_date),
                    email: request.email,
                    password: hashedPassword,
                    email_verified_at: null,
                    role_code: roleConst_1.default.MEMBER_CODE,
                    is_google: false,
                };
                const user = yield this.prisma.user.create({
                    data: dataUser,
                });
                const userNoPass = (0, user_dto_1.excludeUser)(user, ['password']);
                return (0, response_1.successSaveRepo)(userNoPass);
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    if (error.code === 'p2002') {
                        return (0, response_1.failedRepo)('Email Already Exists');
                    }
                }
                return (0, response_1.failedRepo)(error.message);
            }
        });
    }
}
exports.default = AuthRepository;
