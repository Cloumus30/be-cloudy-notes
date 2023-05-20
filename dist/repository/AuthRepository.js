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
const nodemailer_1 = __importDefault(require("nodemailer"));
const firebaseAdminConf_1 = require("../config/firebaseAdminConf");
class AuthRepository {
    // protected supabase: SupabaseClient;
    constructor() {
        this.prisma = new client_1.PrismaClient();
        // this.supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
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
                const authenticated = yield bcryptjs_1.default.compare(request.password, user.password || '-');
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
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            isPassword: (((user === null || user === void 0 ? void 0 : user.password) == '') || ((user === null || user === void 0 ? void 0 : user.password) == null)) ? false : true,
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
                    google_id: '-',
                };
                const user = yield this.prisma.user.create({
                    data: dataUser,
                });
                const userNoPass = (0, user_dto_1.excludeUser)(user, ['password']);
                return (0, response_1.successSaveRepo)(userNoPass);
            }
            catch (error) {
                if (error.code == 'P2002') {
                    return (0, response_1.failedRepo)('Email Sudah Terdaftar');
                }
                return (0, response_1.failedRepo)(error.message);
            }
        });
    }
    sendEmail() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let transporter = nodemailer_1.default.createTransport({
                    host: 'cloudias.my.id',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'cloudy_notes@cloudias.my.id',
                        pass: 'Cloudiasimanip30'
                    }
                });
                let info = yield transporter.sendMail({
                    from: 'cloudy_notes@cloudias.my.id',
                    to: "danagames30@gmail.com",
                    subject: "Ayang",
                    text: "Hello Sayang",
                    html: "<b>Dik Sayang?</b>", // html body
                });
                console.log(info);
                console.log("Message sent: %s", info.messageId);
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info));
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                return (0, response_1.successSaveRepo)(null);
            }
            catch (error) {
                console.log(error);
                return (0, response_1.failedRepo)(error.message);
            }
        });
    }
    login_sosmed(body) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const contentToken = yield firebaseAdminConf_1.firebaseAuth.verifyIdToken(body.token);
                const user = yield this.prisma.user.findFirst({
                    where: {
                        email: contentToken.email,
                    },
                    include: {
                        role: true,
                    }
                });
                let resp = {};
                if (user) {
                    // Generate Token
                    const payload = {
                        'sub': user.id,
                        'role': user.role,
                    };
                    const jwtSecret = process.env.JWT_SECRET || " ";
                    const token = jsonwebtoken_1.default.sign(payload, jwtSecret);
                    resp = {
                        access_key: token,
                        user: {
                            id: user.id,
                            email: user.email,
                            name: user.name,
                            isPassword: (((user === null || user === void 0 ? void 0 : user.password) == '') || ((user === null || user === void 0 ? void 0 : user.password) == null)) ? false : true,
                        },
                        role: user.role,
                    };
                }
                else {
                    const dataUser = {
                        name: contentToken.name,
                        gender: contentToken.gender,
                        birth_date: new Date(contentToken.birth_date || null),
                        email: (_a = contentToken.email) !== null && _a !== void 0 ? _a : '-',
                        password: null,
                        email_verified_at: null,
                        role_code: roleConst_1.default.MEMBER_CODE,
                        google_id: contentToken.uid,
                    };
                    const userNew = yield this.prisma.user.create({
                        data: dataUser,
                        include: {
                            role: true
                        }
                    });
                    // Generate Token
                    const payload = {
                        'sub': userNew.id,
                        'role': userNew.role,
                    };
                    const jwtSecret = process.env.JWT_SECRET || " ";
                    const token = jsonwebtoken_1.default.sign(payload, jwtSecret);
                    resp = {
                        access_key: token,
                        user: {
                            email: userNew.email,
                            name: userNew.name,
                        },
                        role: userNew.role,
                    };
                }
                return (0, response_1.successLogin)(resp);
            }
            catch (error) {
                return (0, response_1.failedRepo)(error.message);
            }
        });
    }
}
exports.default = AuthRepository;
