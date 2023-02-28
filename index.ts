import express, { Request, Response, Express } from "express";
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import {checkToken} from './middleware/authMiddleware';

import authRoutes from './routers/authRoutes';
import noteRoutes from './routers/noteRoutes';
import noteImageRoutes from './routers/noteImageRoutes';
import storageRoutes from './routers/storageRoutes';

import { pagination } from "./middleware/mainMiddleware";


dotenv.config();

const app:Express = express();
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

app.use(express.json());

app.use(pagination);

app.use('/auth', authRoutes);

app.use(checkToken);

app.use('/api/note',noteRoutes);
app.use('/api/note-image', noteImageRoutes);
app.use('/api/storage', storageRoutes);

app.get('/',(req: Request,res: Response)=>{
    return res.send('heelo world');
})

app.listen(port, function(){
    console.log(`⚡️ Server Listening at: ${port}`);
})

module.exports = app;