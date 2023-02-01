"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class BaseController {
}
BaseController.prisma = new client_1.PrismaClient();
exports.default = BaseController;
