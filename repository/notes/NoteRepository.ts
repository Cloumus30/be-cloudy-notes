import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { exclude } from "../../config/Helper";


class NoteRepository{
    protected prisma: PrismaClient;
    constructor(){
        this.prisma = new PrismaClient();
    }

    public async list_notes(request: Request) {
        try {
            const query = {
                orderBy:{
                    id:'desc'
                },
                
                select:{
                    id:true,
                    title:true,
                    user:{
                        select:{
                            id:true,
                            email:true,
                        }
                    },
                }
            };
             const res = await request.body.paginate(this.prisma.notes, query);
             
            return {
                error:false,
                message: ` success Get`,
                data:res
            }
        } catch (error:any) {
            return {
                error:true,
                message: ` ⚠️ ${error.message}`,
            }
        }
    }

    public async store_note(body: any){
        try {
            const user = body.user;

            const data_note = {
                user_id: user.id,
                title: body.title,
                content: body.content || null,
            }

            const res = await this.prisma.notes.create({
                data: data_note,
            });

            return {
                error:false,
                message: ` success Store Data`,
            }
        } catch (error:any) {
            return {
                error:true,
                message: ` ⚠️ ${error.message}`,
            }
        }
    }
}

export default NoteRepository;