import { Request, Response } from "express";
import AuthRepository from "../repository/AuthRepository";
import { validationResult } from "express-validator";
import { resController } from "../config/response";

const authRepository = new AuthRepository();

export const register = async (req:Request, res:Response)=>{
    // Check Error Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const body = req.body;
    const data = await authRepository.register(body);   
     
    
    resController(res,data);
}

export const login = async (req:Request, res:Response) => {
    // Check Error Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const body = req.body;
    const data = await authRepository.login(body);   
     
    resController(res,data);
}