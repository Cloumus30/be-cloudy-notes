"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorFormatter = exports.exclude = exports.paginate = void 0;
const response_1 = require("./response");
const paginate = (query) => {
    var _a, _b;
    const perPage = (_a = parseInt(query.perPage)) !== null && _a !== void 0 ? _a : 10;
    const page = (_b = parseInt(query.page)) !== null && _b !== void 0 ? _b : 1;
    const take = perPage;
    const skip = (perPage * page) - perPage;
    return {
        take,
        skip,
        page,
        perPage,
    };
};
exports.paginate = paginate;
const exclude = (model, keys) => {
    for (let key of keys) {
        delete model[key];
    }
    return model;
};
exports.exclude = exclude;
const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return (0, response_1.failedRepo)(`${param} ${msg}`);
};
exports.errorFormatter = errorFormatter;
