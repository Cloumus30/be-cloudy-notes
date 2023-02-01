import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import CobaRepository from "../../repository/cobaRepository";

const cobaRepository = new CobaRepository();
    
export const getUser =  async(req:Request, res: Response) => {
    const users  = cobaRepository.getUserRepo();
    res.json({
        data: users,
    })
}
 
