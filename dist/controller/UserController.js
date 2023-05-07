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
exports.updateUser = void 0;
const UserRepository_1 = __importDefault(require("../repository/UserRepository"));
const express_validator_1 = require("express-validator");
const helper_1 = require("../config/helper");
const response_1 = require("../config/response");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userRepo = new UserRepository_1.default();
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req).formatWith(helper_1.errorFormatter);
    if (!errors.isEmpty()) {
        const err = errors.array()[0];
        return (0, response_1.resController)(res, err);
    }
    const body = req.body;
    const user = req.body.user;
    const userId = user.id;
    let hashedPassword = null;
    if (body.password) {
        const salt = yield bcryptjs_1.default.genSalt(8);
        hashedPassword = yield bcryptjs_1.default.hash(body.password, salt);
    }
    const data = {
        name: body.name,
        gender: body.gender,
        birth_date: body.birth_date,
        email: body.email,
        password: hashedPassword,
        role_code: user.role_code,
        google_id: user.google_id,
        email_verified_at: user.email_verified_at,
    };
    const result = yield userRepo.updateUser(userId, data);
    return (0, response_1.resController)(res, result);
});
exports.updateUser = updateUser;
