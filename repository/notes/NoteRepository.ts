import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { noteCreate, noteUpdate} from "../../prisma/dto/note.dto";
import { failedRepo, successDeleteRepo, successGetRepo, successSaveRepo, successUpdateRepo } from "../../config/response";


class NoteRepository{
    protected prisma: PrismaClient;
    constructor(){
        this.prisma = new PrismaClient();
    }

    public async list_notes(request: Request) {
        try {
            const user = request.body.user;
            const search = request.query.q;
            const query = {
                where:{
                    user_id: user.id,
                    title: {
                        contains: search,
                        mode: 'insensitive'
                    }
                },
                orderBy:{
                    id:'desc'
                },
                
                select:{
                    id:true,
                    title:true,
                    created_at:true,
                    updated_at:true,
                    user:{
                        select:{
                            id:true,
                            email:true,
                        }
                    },
                }
            };
             const res = await request.body.paginate(this.prisma.notes, query);
             
            return successGetRepo(res)
        } catch (error:any) {
            return failedRepo(error.message)
        }
    }

    public async detail_notes(id:number){
        try {
            const note = await this.prisma.notes.findFirst({
                where: {
                    id
                },
                include:{
                    user: true,
                }
            });
            let res = null;
            if(note){
                res = {
                    id: note.id,
                    title: note.title,
                    short_desc: note.short_desc,
                    content: note.content,
                    user_id: note.user_id,
                    user_name: note.user.name,
                    created_at : note.created_at,
                };
            }
            return successGetRepo(res)
        } catch (error:any) {
            return failedRepo(error.message)
            
        }
    }

    public async store_note(body: any){
        try {
            const user = body.user;

            const data_note: noteCreate = {
                user_id: user.id,
                title: body.title,
                short_desc: body.short_desc || null,
                content: body.content || null,
            }

            const res = await this.prisma.notes.create({
                data: data_note,
            });

            return successSaveRepo(res)
        } catch (error:any) {
            return {
                error:true,
                message: ` ⚠️ ${error.message}`,
            }
        }
    }

    public async update_note(id:number, body: any){
        try {
            const user = body.user;

            const data_note:noteUpdate = {
                title: body.title,
                short_desc: body.short_desc || null,
                content: body.content || null,
            }
    
            const res = await this.prisma.notes.update({
                where:{
                    id
                },
                data: data_note
            });
            return successUpdateRepo()
        } catch (error: any) {
            return failedRepo(error.message)
        }
    }

    public async delete_note (id:number, body:any){
        try {
            const user = body.user;
            const note = await this.prisma.notes.findFirst({
                where:{
                    id,
                    user_id: user.id
                }
            }) 
            if(note){
                await this.prisma.notes.delete({
                    where:{
                        id: id,
                    }
                })
                return successDeleteRepo();
            }
            return failedRepo('Note Not Found');
        } catch (error: any) {
            return failedRepo(error.message);
        }
        
    }
}

export default NoteRepository;