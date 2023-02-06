import { Request, Response } from "express";
import NoteRepository from "../../repository/notes/NoteRepository";
import { resController } from "../../config/response";

const noteRepository = new NoteRepository();

export const listNote = async (req:Request, res:Response)=>{
    
    const data = await noteRepository.list_notes(req);   
     
    resController(res, data);
}

export const detailNote = async (req:Request, res:Response) => {
    const id = parseInt(req.params.id);
    const data = await noteRepository.detail_notes(id);

    if(data.error){
        console.error(data.message);
        res.status(400).json(data)
    }else{
        res.status(200).json(data)
    }
}

export const storeNote = async (req: Request, res: Response) =>{
    const body = req.body;
    const data = await noteRepository.store_note(body);

    resController(res, data);
}

export const updateNote = async( req:Request, res:Response ) =>{
    const body =  req.body;
    const id = parseInt(req.params.id);
    const data = await noteRepository.update_note(id,body);

    resController(res, data)
}

export const deleteNote = async(req: Request, res:Response) => {
    const body =  req.body;
    const id =  parseInt(req.params.id);
    const data =  await noteRepository.delete_note(id, body);

    resController(res, data);
}