"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludeUser = void 0;
const excludeUser = (user, keys) => {
    for (const key of keys) {
        delete user[key];
    }
    return user;
};
exports.excludeUser = excludeUser;
