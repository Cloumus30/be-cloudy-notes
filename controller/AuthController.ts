import { Request, Response } from "express";
import AuthRepository from "../repository/AuthRepository";
import { validationResult } from "express-validator";
import { resController } from "../config/response";
import cryptoJs from "crypto-js";

// @ts-ignore  
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

/**
 * @openapi
 * /auth/login:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

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

export const loginSosmed = async (req:Request, res:Response) =>{
  const data = await authRepository.login_sosmed(req.body);

  resController(res, data);
}

export const checkEmail = async(req:Request, res:Response) =>{
  const data = await authRepository.sendEmail();

  resController(res,data);
}