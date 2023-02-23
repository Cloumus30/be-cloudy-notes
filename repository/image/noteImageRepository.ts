import { Prisma, PrismaClient, User } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { failedRepo, successLogin, successSaveRepo } from "../../config/response";
import { noteImageCreateUpdate, noteImageRootPath } from "../../prisma/dto/noteImage.dto";
import { UploadedFile } from "express-fileupload";
import uniqid from 'uniqid';
import {createClient, SupabaseClient} from '@supabase/supabase-js'

class NoteImageRepository{
    protected prisma : PrismaClient;
    protected supabase;

    constructor(){
        this.prisma = new PrismaClient();
        this.supabase = createClient(process.env.SUPABASE_URL! , process.env.SUPABASE_KEY!);
    }

    public async createNoteImage(body: any, file: UploadedFile|any){
        try {
            const user = body.user;
            const note = await this.prisma.notes.findFirst({
                where:{
                    id: body.note_id,
                }
            });
            if(!note){
                return failedRepo('Note Not Found');
            }
            const { data, error } = await this.supabase
                .storage
                .createBucket('avatars', { public: true });
            if(error){
                console.log(error);
                throw new Error(error.message);
            }
            
            const path = `${noteImageRootPath}/${user.id}/`
            
            const fileUpload = await this.uploadImage(file, path);
            const data_image : noteImageCreateUpdate = {
                note_id: note.id,
                path: fileUpload.path,
                size: fileUpload.size,
                mime_type: fileUpload.mime_type,
            };
            const noteImage = await this.prisma.noteImages.create({
                data: data_image
            });
            return successSaveRepo(noteImage);
        } catch (error: any) {
            return failedRepo(error.message);
        }
    }

    public async uploadImage(file: UploadedFile, path:string){
        try {
            
            const originalName = file.name;
            const extension = originalName.match(/\.[0-9a-z]+$/i);
            const fileName = uniqid()+extension;
            const fullPath = `${path}${fileName}`;
            const fileUpload = await file.mv(fullPath);
            return {
                path,
                size : file.size,
                mime_type: file.mimetype,
            };
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default NoteImageRepository;