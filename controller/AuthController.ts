import { Request, Response } from "express";
import AuthRepository from "../repository/AuthRepository";
import { ValidationError, validationResult } from "express-validator";
import { failedRepo, resController } from "../config/response";
import { errorFormatter } from "../config/helper";

const authRepository = new AuthRepository();

export const register = async (req:Request, res:Response)=>{
    // Check Error Validation
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      const err = errors.array()[0];
      return resController(res,err)
    }
    
    const body = req.body;
    const data = await authRepository.register(body);   
     
    
    resController(res,data);
}

export const login = async (req:Request, res:Response) => {
    // Check Error Validation
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      const err = errors.array()[0];
      return resController(res,err)
    }

    const body = req.body;
    const data = await authRepository.login(body);   
     
    resController(res,data);
}