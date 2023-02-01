import { Request, Response } from "express";

export const checkToken = async (req:Request, res:Response) =>{
    try {
        
    } catch (error: any) {
        console.log('⚠️ ' + error)
        res.json({
            message: error.message
        })
    }
}