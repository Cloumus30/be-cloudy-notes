"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const authRoutes_1 = __importDefault(require("./routers/authRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.APP_PORT || 3000;
app.use(express_1.default.json());
app.use('/auth', authRoutes_1.default);
app.use(authMiddleware_1.checkToken);
app.get('/', (req, res) => {
    return res.send('heelo world');
});
app.listen(port, function () {
    console.log(`⚡️ Server Listening at: ${port}`);
});
