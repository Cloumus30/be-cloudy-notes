import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import UserRepository from "../repository/UserRepository";
import cryptoJs from 'crypto-js';

const userRepository = new UserRepository();

export const checkToken = async (req:Request, res:Response, next: NextFunction) =>{
    try {
        const authHeader = req.get('authorization')?.split(' ');
        const token:string = authHeader?.[1]!;
        const jwtSecret:string = process.env.JWT_SECRET!;
        const payload:any = jwt.verify(token, jwtSecret);
        
        const user = await userRepository.getOneUser(payload.sub);
        if(!user){
            res.status(403).json({
                error:true,
                message: ` ⚠️ Unauthorize`,
            })
        }
        
        req.body.role = payload.role;
        req.body.user = user;
        
        next();
    } catch (error: any) {
        console.log('⚠️ ' + error)
        res.status(403).json({
            error:true,
            message: ` ⚠️ ${error.message}`,
        })
    }
}

export const decryptBody = async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const methods = ['POST', 'PUT', 'PATCH'];
        const isis = req.body.isis;
        if(methods.includes(req.method) && isis){
            let decryptedBody:any = cryptoJs.AES.decrypt(req.body.isis, process.env.CRYPTO_SECRET!).toString(cryptoJs.enc.Utf8)
            decryptedBody = JSON.parse(decryptedBody);
            req.body = {
                ... req.body,
                ... decryptedBody
            }
        }
        next();
    } catch (error:any) {
        console.log('⚠️ ' + error)
        res.status(403).json({
            error:true,
            message: ` ⚠️ ${error.message}`,
        })
    }
}