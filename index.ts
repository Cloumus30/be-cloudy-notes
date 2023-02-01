import express, { Request, Response, Express } from "express";
import dotenv from 'dotenv';
import {PrismaClient} from '@prisma/client';

import {getUser} from './controller/Coba/CobaController'

import cobaRoutes from './routers/cobaRoutes';
import authRoutes from './routers/authRoutes';

dotenv.config();

const app:Express = express();
const port = process.env.APP_PORT || 3000; 

// Setup prisma client
const prisma = new PrismaClient()

app.use(express.json());

app.get('/',(req: Request,res: Response)=>{
    return res.send('heelo world');
})

app.use('/auth', authRoutes);

app.listen(port, function(){
    console.log(`⚡️ Server Listening at: ${port}`);
})