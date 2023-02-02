import { PrismaClient, User } from "@prisma/client";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(8);

const users: Omit<User,'id'>[] = [
    {
        first_name:'admin',
        last_name:'adm',
        gender:'laki-laki',
        birth_date: new Date('1998-12-30'),
        email:'admin@admin.com',
        password: bcrypt.hashSync('superadmin123'),
        email_verified_at: null,
        role_code: '4dmin',
        is_google:false,
    }
]

const run = async (prisma:PrismaClient) =>{
    await users.forEach(async (el) => {
        await prisma.user.upsert({
            create: el,
            update: el,
            where:{
                email: el.email,
            }
        })
    });

    return {
        finish:true,
    }
}

export default run;