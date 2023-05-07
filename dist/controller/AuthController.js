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
exports.checkEmail = exports.loginSosmed = exports.login = exports.register = void 0;
const AuthRepository_1 = __importDefault(require("../repository/AuthRepository"));
const express_validator_1 = require("express-validator");
const response_1 = require("../config/response");
// @ts-ignore  
const helper_1 = require("../config/helper");
const authRepository = new AuthRepository_1.default();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check Error Validation
    const errors = (0, express_validator_1.validationResult)(req).formatWith(helper_1.errorFormatter);
    if (!errors.isEmpty()) {
        const err = errors.array()[0];
        return (0, response_1.resController)(res, err);
    }
    const body = req.body;
    const data = yield authRepository.register(body);
    (0, response_1.resController)(res, data);
});
exports.register = register;
/**
 * @openapi
 * /auth/login:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check Error Validation
    const errors = (0, express_validator_1.validationResult)(req).formatWith(helper_1.errorFormatter);
    if (!errors.isEmpty()) {
        const err = errors.array()[0];
        return (0, response_1.resController)(res, err);
    }
    const body = req.body;
    const data = yield authRepository.login(body);
    (0, response_1.resController)(res, data);
});
exports.login = login;
const loginSosmed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield authRepository.login_sosmed(req.body);
    (0, response_1.resController)(res, data);
});
exports.loginSosmed = loginSosmed;
const checkEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield authRepository.sendEmail();
    (0, response_1.resController)(res, data);
});
exports.checkEmail = checkEmail;
