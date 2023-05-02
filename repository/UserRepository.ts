import { PrismaClient } from "@prisma/client";
import { UserCreateUpdate } from "../prisma/dto/user.dto";
import { failedRepo, successSaveRepo } from "../config/response";

class UserRepository{
    protected prisma : PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    public async getOneUser(id:number){
        const users = await this.prisma.user.findFirst({
            where:{
                id
            },
            select:{
                id:true,
                email: true,
                name:true,
            }
        });
        return users;
    }

    public async updateUser(userId:number, request:UserCreateUpdate){
        try {
            const user = await this.prisma.user.update({
                where:{
                    id: userId
                },
                data: request
            });
            return successSaveRepo(user);   
        } catch (error:any) {
            if(error.code == 'P2002'){
                return failedRepo('Email Sudah Terdaftar');
            }
            return failedRepo(error.message)
        }
    }
}

export default UserRepository;