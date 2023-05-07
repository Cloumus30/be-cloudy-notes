"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagination = void 0;
const prisma_pagination_1 = require("prisma-pagination");
const pagination = (req, res, next) => {
    var _a;
    const page = req.query.page || 1;
    const perPage = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.perPage) || 10;
    req.body.paginate = (0, prisma_pagination_1.createPaginator)({ page, perPage });
    next();
};
exports.pagination = pagination;
