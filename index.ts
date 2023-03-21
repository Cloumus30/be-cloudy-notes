import express, { Request, Response, Express } from "express";
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import firebaseAdmin from 'firebase-admin';

import {checkToken} from './middleware/authMiddleware';

import authRoutes from './routers/authRoutes';
import noteRoutes from './routers/noteRoutes';
import noteImageRoutes from './routers/noteImageRoutes';
import storageRoutes from './routers/storageRoutes';

import { pagination } from "./middleware/mainMiddleware";


dotenv.config();

const app:Express = express();
const port = process.env.APP_PORT || 3000; 

app.use(cors());
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