import express, { Request, Response, Express } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import {checkToken, decryptBody} from './middleware/authMiddleware';

import authRoutes from './routers/authRoutes';
import noteRoutes from './routers/noteRoutes';
import { pagination } from "./middleware/mainMiddleware";
import swaggerUi from "swagger-ui-express";
import { options } from "./docs/swaggerJsOptions";
import swaggerJsDoc from 'swagger-jsdoc';

dotenv.config();

const app:Express = express();
const port = process.env.APP_PORT || 3000; 

app.use(cors());
app.use(express.json());
app.use(pagination);

// Swagger
const openApiSpec = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(openApiSpec));

// Decrypt Body encrypted
app.use(decryptBody);

app.use('/auth', authRoutes);

app.use(checkToken);

app.use('/api/note',noteRoutes);

app.get('/',(req: Request,res: Response)=>{
    return res.send('heelo world');
})

app.listen(port, function(){
    console.log(`⚡️ Server Listening at: ${port}`);
})

module.exports = app;