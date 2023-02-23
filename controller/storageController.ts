import { Request, Response } from "express";
import StorageRepository from "../repository/storageRepository";
import { resController } from "../config/response";
import { validationResult } from "express-validator";

const storageRepository = new StorageRepository();

export const listBucket = async (req:Request, res:Response) =>{
    const data = await storageRepository.listBucket();

    resController(res, data);
}

export const detailBucket = async(req:Request, res:Response) => {
    const bucketName = req.params.bucketName
    const data = await storageRepository.detailBucket(bucketName);

    resController(res, data);
}

export const createBucket = async (req:Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const body = req.body;
    const data = await storageRepository.createBucket(body.bucket_name);

    resController(res, data);
}