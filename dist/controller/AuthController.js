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
exports.login = exports.register = void 0;
const AuthRepository_1 = __importDefault(require("../repository/AuthRepository"));
const express_validator_1 = require("express-validator");
const authRepository = new AuthRepository_1.default();
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check Error Validation
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body;
    const data = yield authRepository.register(body);
    if (data.error) {
        console.error(data.message);
        res.status(400).json(data);
    }
    else {
        res.status(200).json(data);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check Error Validation
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body;
    const data = yield authRepository.login(body);
    if (data.error) {
        console.error(data.message);
        res.status(400).json(data);
    }
    else {
        res.status(200).json(data);
    }
});
exports.login = login;
