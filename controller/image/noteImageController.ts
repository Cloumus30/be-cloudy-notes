import { Request, Response } from "express";
import NoteImageRepository from "../../repository/image/noteImageRepository";
import { resController } from "../../config/response";

const noteImageRepository = new NoteImageRepository();

export const uploadNoteImage = async (req:Request, res: Response) => {
    const body = req.body;
    const fileUpload = req.files?.image;
    const data = await noteImageRepository.createNoteImage(body, fileUpload);
    
    return resController(res, data);
}