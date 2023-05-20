import { Prisma, PrismaClient } from "@prisma/client";
import { UserCreateUpdate, UserUpdatePassword, excludeUser } from "../prisma/dto/user.dto";
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

    public async getOneUserDetail(id:number){
        const users = await this.prisma.user.findFirst({
            where:{
                id
            }
        });
        
        const res = {
            id: users?.id,
            email: users?.email,
            name: users?.name,
            birth_date: users?.birth_date,
            isPassword: ((users?.password == '') || (users?.password == null)) ? false : true, 
        }
        return res;
    }

    public async updateUser(userId:number, request:UserCreateUpdate){
        try {
            const birthDate = request.birth_date || null;
            if(birthDate !== null){
                request.birth_date = new Date(birthDate)
            }
            const user = await this.prisma.user.update({
                where:{
                    id: userId
                },
                data: request
            });
            const result = excludeUser(user, ['password'])
            return successSaveRepo(result);
        } catch (error:any) {
            if(error.code == 'P2002'){
                return failedRepo('Email Sudah Terdaftar');
            }
            return failedRepo(error.message)
        }
    }

    public async updateUserPassword(userId:number, request:UserUpdatePassword){
        try {
            const user = await this.prisma.user.update({
                where:{
                    id: userId
                },
                data: request
            });
            const result = {
                id: user?.id,
                email: user?.email,
                name: user?.name,
                birth_date: user?.birth_date,
                isPassword: ((user?.password == '') || (user?.password == null)) ? false : true, 
            }
            return successSaveRepo(result);   
        } catch (error:any) {
            if(error.code == 'P2002'){
                return failedRepo('Email Sudah Terdaftar');
            }
            return failedRepo(error.message)
        }
    }
}

export default UserRepository;