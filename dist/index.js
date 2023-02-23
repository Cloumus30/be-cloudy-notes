"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const authRoutes_1 = __importDefault(require("./routers/authRoutes"));
const noteRoutes_1 = __importDefault(require("./routers/noteRoutes"));
const noteImageRoutes_1 = __importDefault(require("./routers/noteImageRoutes"));
const mainMiddleware_1 = require("./middleware/mainMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.APP_PORT || 3000;
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)());
app.use(mainMiddleware_1.pagination);
app.use('/auth', authRoutes_1.default);
app.use(authMiddleware_1.checkToken);
app.use('/api/note', noteRoutes_1.default);
app.use('/api/notes-image', noteImageRoutes_1.default);
app.get('/', (req, res) => {
    return res.send('heelo world');
});
app.listen(port, function () {
    console.log(`⚡️ Server Listening at: ${port}`);
});
module.exports = app;
