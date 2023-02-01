import { PrismaClient } from "@prisma/client";

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
                email: true,
            }
        });
        return users;
    }
}

export default UserRepository;