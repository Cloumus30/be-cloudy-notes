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
const roles = [
    {
        name: 'admin',
        code: '4dmin'
    },
    {
        name: 'member',
        code: 'mem5er',
    }
];
const run = (prisma) => __awaiter(void 0, void 0, void 0, function* () {
    yield roles.forEach((el) => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma.role.upsert({
            create: el,
            update: el,
            where: {
                code: el.code,
            }
        });
    }));
    return {
        finish: true,
    };
});
exports.default = run;
