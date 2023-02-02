import { Request, Response } from "express";
import NoteRepository from "../../repository/notes/NoteRepository";

const noteRepository = new NoteRepository();

export const listNote = async (req:Request, res:Response)=>{
    
    const data = await noteRepository.list_notes(req);   
     
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

    if(data.error){
        console.error(data.message);
        res.status(400).json(data)
    }else{
        res.status(200).json(data)
    }
}