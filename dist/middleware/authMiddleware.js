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
exports.checkToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserRepository_1 = __importDefault(require("../repository/UserRepository"));
const userRepository = new UserRepository_1.default();
const checkToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const authHeader = (_a = req.get('authorization')) === null || _a === void 0 ? void 0 : _a.split(' ');
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader[1];
        const jwtSecret = process.env.JWT_SECRET;
        const payload = jsonwebtoken_1.default.verify(token, jwtSecret);
        const user = yield userRepository.getOneUser(payload.sub);
        if (!user) {
            res.status(403).json({
                error: true,
                message: ` ⚠️ Unauthorize`,
            });
        }
        req.body.role = payload.role;
        next();
    }
    catch (error) {
        console.log('⚠️ ' + error);
        res.status(403).json({
            error: true,
            message: ` ⚠️ ${error.message}`,
        });
    }
});
exports.checkToken = checkToken;
