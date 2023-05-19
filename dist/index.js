"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const authRoutes_1 = __importDefault(require("./routers/authRoutes"));
const noteRoutes_1 = __importDefault(require("./routers/noteRoutes"));
const mainMiddleware_1 = require("./middleware/mainMiddleware");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerJsOptions_1 = require("./docs/swaggerJsOptions");
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.APP_PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(mainMiddleware_1.pagination);
// Swagger
const openApiSpec = (0, swagger_jsdoc_1.default)(swaggerJsOptions_1.options);
app.use('/api-docs', swagger_ui_express_1.default.serve);
app.get('/api-docs', swagger_ui_express_1.default.setup(openApiSpec));
// Decrypt Body encrypted
// app.use(decryptBody);
app.use('/auth', authRoutes_1.default);
app.use(authMiddleware_1.checkToken);
app.use('/api/note', noteRoutes_1.default);
app.get('/', (req, res) => {
    return res.send('heelo world');
});
app.listen(port, function () {
    console.log(`⚡️ Server Listening at: ${port}`);
});
module.exports = app;
