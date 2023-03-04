import { Prisma, PrismaClient, User } from "@prisma/client";
import bcrypt from 'bcryptjs';
import RoleConst from "../const/roleConst";
import jwt from 'jsonwebtoken';
import { UserCreateUpdate, UserGet, excludeUser } from "../prisma/dto/user.dto";
import { failedRepo, successLogin, successSaveRepo } from "../config/response";
import {createClient, SupabaseClient} from '@supabase/supabase-js';

class AuthRepository{
    protected prisma : PrismaClient;
    protected supabase: SupabaseClient;

    constructor(){
        this.prisma = new PrismaClient();
        this.supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);
    }

    public async login(request: any){
        try {
            const user = await this.prisma.user.findFirst({
                where:{
                    email:request.email,
                },
                include:{
                    role:true,
                }
            });
            if (!user){
                return failedRepo('User Not Found')
            }
    
            const authenticated = await bcrypt.compare(request.password, user.password);
            if(authenticated){
                const payload = {
                    'sub' : user.id,
                    'role' : user.role,
                };
                const jwtSecret = process.env.JWT_SECRET || " ";
                const token = jwt.sign(payload, jwtSecret);
                const resp = {
                    access_key: token,
                    user: {
                        email: user.email,
                        name: user.name,
                    },
                    role: user.role,
                }
                return successLogin(resp);
            }
    
            return failedRepo('User or Password incorrect');
        } catch (error:any) {
            return failedRepo(error.message)
        }
        
    }
    public async register(request: any){
        try {
            const salt = await bcrypt.genSalt(8);
            const hashedPassword = await bcrypt.hash(request.password, salt);
            const dataUser: UserCreateUpdate = {
                name: request.name,
                gender: request.gender,
                birth_date: new Date(request.birth_date),
                email: request.email,
                password: hashedPassword,
                email_verified_at: null,
                role_code: RoleConst.MEMBER_CODE,
                is_google:false,
            };
            const user= await this.prisma.user.create({
                data: dataUser,
            })
            
            const userNoPass: UserGet = excludeUser(user,['password']);

            return successSaveRepo(userNoPass)
        } catch (error: any) {
            if(error.code == 'P2002'){
                return failedRepo('Email Sudah Terdaftar');
            }
            return failedRepo(error.message)
        }
    }
}

export default AuthRepository;