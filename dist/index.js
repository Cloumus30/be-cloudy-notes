"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const authRoutes_1 = __importDefault(require("./routers/authRoutes"));
const noteRoutes_1 = __importDefault(require("./routers/noteRoutes"));
const noteImageRoutes_1 = __importDefault(require("./routers/noteImageRoutes"));
const storageRoutes_1 = __importDefault(require("./routers/storageRoutes"));
const mainMiddleware_1 = require("./middleware/mainMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.APP_PORT || 3000;
// app.use(cors({
//     origin: "*",
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     preflightContinue: false,
//     optionsSuccessStatus: 204
//   }));
// app.options('*', cors())
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    // Pass to next layer of middleware
    next();
});
app.use(express_1.default.json());
app.use(mainMiddleware_1.pagination);
app.use('/auth', authRoutes_1.default);
app.use(authMiddleware_1.checkToken);
app.use('/api/note', noteRoutes_1.default);
app.use('/api/note-image', noteImageRoutes_1.default);
app.use('/api/storage', storageRoutes_1.default);
app.get('/', (req, res) => {
    return res.send('heelo world');
});
app.listen(port, function () {
    console.log(`⚡️ Server Listening at: ${port}`);
});
module.exports = app;
