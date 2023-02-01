import { PrismaClient } from "@prisma/client";

class CobaRepository{
    protected prisma : PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    public async getUserRepo(){
        const users = this.prisma.user.findMany();
        return users;
    }
}

export default CobaRepository;