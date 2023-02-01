import { Request, Response } from "express";
import AuthRepository from "../repository/AuthRepository";
import { validationResult } from "express-validator";

const authRepository = new AuthRepository();

export const register = async (req:Request, res:Response)=>{
    // Check Error Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const body = req.body;
    const data = await authRepository.register(body);   
     
    
    if(data.error){
        console.error(data.message);
        res.status(400).json(data)
    }else{
        res.status(200).json(data)
    }
}

export const login = async (req:Request, res:Response) => {
    // Check Error Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const body = req.body;
    const data = await authRepository.login(body);   
     
    if(data.error){
        console.error(data.message);
        res.status(400).json(data)
    }else{
        res.status(200).json(data)
    }
}