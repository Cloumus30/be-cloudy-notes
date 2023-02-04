import { Prisma, PrismaClient, User } from "@prisma/client";
import bcrypt from 'bcryptjs';
import RoleConst from "../const/roleConst";
import jwt from 'jsonwebtoken';
import { UserCreateUpdate, UserGet, excludePass } from "../prisma/dto/user.dto";

class AuthRepository{
    protected prisma : PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
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
                return {
                    error:true,
                    message: 'User Not Found',
                }
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
                    },
                    role: user.role,
                }
                return {
                    error:false,
                    message: 'success Login',
                    data: resp,
                }
            }
    
            return {
                error:true,
                message: 'User Or password incorrect',
            }    
        } catch (error:any) {
            return {
                error:true,
                message: ` ⚠️ ${error.message}`,
            }
        }
        
    }
    public async register(request: any){
        try {
            const salt = await bcrypt.genSalt(8);
            const hashedPassword = await bcrypt.hash(request.password, salt);
            const dataUser: UserCreateUpdate = {
                first_name: request.first_name,
                last_name: request.last_name,
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
            const userNoPass: UserGet = excludePass(user,['password']);
            return {
                error:false,
                message: 'Success Register',
                data: userNoPass
            }
        } catch (error: any) {
            if(error instanceof Prisma.PrismaClientKnownRequestError){
                if(error.code === 'p2002'){
                    return {
                        error:true,
                        message: ` ⚠️ Email Already Exists`,
                    }        
                }
            }
            return {
                error:true,
                message: ` ⚠️ ${error.message}`,
            }
        }
    }
}

export default AuthRepository;