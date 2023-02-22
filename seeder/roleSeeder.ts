import { PrismaClient, Role } from "@prisma/client";
import { RoleCreateUpdate } from "../prisma/dto/role.dto";

const roles: RoleCreateUpdate[] = [
    {
        name: 'admin',
        code: '4dmin'
    },
    {
        name: 'member',
        code: 'mem5er',
    }
]

const run = async (prisma:PrismaClient) =>{
    await roles.forEach(async (el) => {
        await prisma.role.upsert({
            create: el,
            update: el,
            where:{
                code: el.code,
            }
        })
    });

    return {
        finish:true,
    }
}

export default run;