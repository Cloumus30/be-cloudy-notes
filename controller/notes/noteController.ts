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