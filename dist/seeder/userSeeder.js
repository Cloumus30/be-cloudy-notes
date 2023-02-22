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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const salt = bcryptjs_1.default.genSaltSync(8);
const users = [
    {
        name: 'admin',
        gender: 'laki-laki',
        birth_date: new Date('1998-12-30'),
        email: 'admin@admin.com',
        password: bcryptjs_1.default.hashSync('superadmin123'),
        email_verified_at: null,
        role_code: '4dmin',
        is_google: false,
    }
];
const run = (prisma) => __awaiter(void 0, void 0, void 0, function* () {
    yield users.forEach((el) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.user.upsert({
            create: el,
            update: el,
            where: {
                email: el.email,
            }
        });
    }));
    return {
        finish: true,
    };
});
exports.default = run;
