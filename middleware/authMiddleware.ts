import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import UserRepository from "../repository/UserRepository";

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
        
        next();
    } catch (error: any) {
        console.log('⚠️ ' + error)
        res.status(403).json({
            error:true,
            message: ` ⚠️ ${error.message}`,
        })
    }
}