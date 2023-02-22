"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resController = exports.failedRepo = exports.successDeleteRepo = exports.successUpdateRepo = exports.successSaveRepo = exports.successGetRepo = exports.successLogin = void 0;
const successLogin = (data = null) => {
    return {
        error: false,
        message: '👍 Success Login',
        data
    };
};
exports.successLogin = successLogin;
const successGetRepo = (data = null) => {
    return {
        error: false,
        message: '👍 Success Get Data',
        data
    };
};
exports.successGetRepo = successGetRepo;
const successSaveRepo = (data = null) => {
    return {
        error: false,
        message: '👍 Success Save Data',
        data
    };
};
exports.successSaveRepo = successSaveRepo;
const successUpdateRepo = (data = null) => {
    return {
        error: false,
        message: '👍 Success Update Data',
        data
    };
};
exports.successUpdateRepo = successUpdateRepo;
const successDeleteRepo = (data = null) => {
    return {
        error: false,
        message: '👍 🗑 Success Delete Data',
        data
    };
};
exports.successDeleteRepo = successDeleteRepo;
// Failed Response
const failedRepo = (message = '⚠️ Failed Request', code = 10) => {
    return {
        error: true,
        message: `⚠️ ${message}`,
        code,
    };
};
exports.failedRepo = failedRepo;
// Controller Response
const resController = (res, data, successCode = 200, errorCode = 400) => {
    if (data.error) {
        console.error(data.message);
        res.status(errorCode).json(data);
    }
    else {
        res.status(successCode).json(data);
    }
};
exports.resController = resController;
