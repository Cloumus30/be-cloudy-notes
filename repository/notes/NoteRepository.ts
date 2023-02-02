import { PrismaClient } from "@prisma/client";
import { paginate } from "../../config/Helper";
import { Request } from "express";
import { createPaginator } from "prisma-pagination";

class NoteRepository{
    protected prisma: PrismaClient;
    constructor(){
        this.prisma = new PrismaClient();
    }

    public async list_notes(request: Request) {
        try {
            const paginate =  createPaginator({perPage:1})
            const res = await request.body.paginate(this.prisma.notes, {orderBy:{id:'desc'}});

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
}

export default NoteRepository;