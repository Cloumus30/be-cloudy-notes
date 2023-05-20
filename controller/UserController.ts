import { Request, Response } from "express";
import UserRepository from "../repository/UserRepository";
import { validationResult } from "express-validator";
// import { errorFormatter } from "../config/helper";
import { resController } from "../config/response";
import { UserCreateUpdate, UserUpdatePassword } from "../prisma/dto/user.dto";
import bcrypt from "bcryptjs";

const userRepo = new UserRepository();

export const getUser = async(req:Request, res:Response)=>{
    const user = req.body.user;
    if(user){
        const data = await userRepo.getOneUserDetail(user.id);
        return resController(res, data);
    }
    
}

export const updateUser = async (req:Request, res:Response) =>{
    // const errors = validationResult(req).formatWith(errorFormatter);
    // if (!errors.isEmpty()) {
    //   const err = errors.array()[0];
    //   return resController(res,err);
    // }

    const body = req.body;
    const user = req.body.user;
    const userId = user.id;
    let hashedPassword = null;
    if(body.password){
        const salt = await bcrypt.genSalt(8);
        hashedPassword = await bcrypt.hash(body.password, salt);
    }
    
    const data:UserCreateUpdate = {
        name: body.name,
        gender: body.gender,
        birth_date: body.birth_date,
        email: body.email,
        password: hashedPassword,
        role_code: user.role_code,
        google_id: user.google_id,
        email_verified_at: user.email_verified_at,
    }
    const result = await userRepo.updateUser(userId, data);
    return resController(res, result);
}

export const updateUserPass = async (req:Request, res:Response) =>{
    const body = req.body;
    const user = req.body.user;
    const userId = user.id;
    let hashedPassword = null;
    if(body.password){
        const salt = await bcrypt.genSalt(8);
        hashedPassword = await bcrypt.hash(body.password, salt);
    }
    
    const data:UserUpdatePassword = {
        password: hashedPassword,
    }
    const result = await userRepo.updateUserPassword(userId, data);
    return resController(res, result);
}

