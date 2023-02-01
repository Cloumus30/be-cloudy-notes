import express, { Request, Response, Express } from "express";
import dotenv from 'dotenv';

import {checkToken} from './middleware/authMiddleware';

import authRoutes from './routers/authRoutes';

dotenv.config();

const app:Express = express();
const port = process.env.APP_PORT || 3000; 

app.use(express.json());

app.use('/auth', authRoutes);

app.use(checkToken);
app.get('/',(req: Request,res: Response)=>{
    return res.send('heelo world');
})

app.listen(port, function(){
    console.log(`⚡️ Server Listening at: ${port}`);
})