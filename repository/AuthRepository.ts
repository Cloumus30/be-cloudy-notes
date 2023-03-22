import { Prisma, PrismaClient, User } from "@prisma/client";
import bcrypt from 'bcryptjs';
import RoleConst from "../const/roleConst";
import jwt from 'jsonwebtoken';
import { UserCreateUpdate, UserGet, excludeUser } from "../prisma/dto/user.dto";
import { failedRepo, successLogin, successSaveRepo } from "../config/response";
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import nodemailer from 'nodemailer';
import { firebaseAuth } from "../config/firebaseAdminConf";

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
    
            const authenticated = await bcrypt.compare(request.password, user.password || '-');
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
                google_id:'-',
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

    public async sendEmail(){
        try {
            let transporter = nodemailer.createTransport({
                host: 'cloudias.my.id',
                port: 465,
                secure: true,
                auth:{
                    user: 'cloudy_notes@cloudias.my.id',
                    pass: 'Cloudiasimanip30'
                }
            })

            let info = await transporter.sendMail({
                from: 'cloudy_notes@cloudias.my.id', // sender address
                to: "danagames30@gmail.com", // list of receivers
                subject: "Ayang", // Subject line
                text: "Hello Sayang", // plain text body
                html: "<b>Dik Sayang?</b>", // html body
              });
              console.log(info);
              console.log("Message sent: %s", info.messageId);
              // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            
              // Preview only available when sending through an Ethereal account
              console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
              // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            

            return successSaveRepo(null);
        } catch (error: any) {
            console.log(error);
            return failedRepo(error.message)
        }
    }

    public async login_sosmed(body:any){
        try {
            const contentToken = await firebaseAuth.verifyIdToken(body.token);
            const user = await this.prisma.user.findFirst({
                where:{
                    email: contentToken.email,
                },
                include:{
                    role:true,
                }
            })
            let resp = {}

            if(user){

                // Generate Token
                const payload = {
                    'sub' : user.id,
                    'role' : user.role,
                };
                const jwtSecret = process.env.JWT_SECRET || " ";
                const token = jwt.sign(payload, jwtSecret);
                resp = {
                    access_key: token,
                    user: {
                        email: user.email,
                        name: user.name,
                    },
                    role: user.role,
                }
            }else{
                const dataUser: UserCreateUpdate = {
                    name: contentToken.name,
                    gender: contentToken.gender,
                    birth_date: new Date(contentToken.birth_date || null),
                    email: contentToken.email ?? '-',
                    password: null,
                    email_verified_at: null,
                    role_code: RoleConst.MEMBER_CODE,
                    google_id: contentToken.uid,
                };
                const userNew= await this.prisma.user.create({
                    data: dataUser,
                    include:{
                        role:true
                    }
                })

                // Generate Token
                const payload = {
                    'sub' : userNew.id,
                    'role' : userNew.role,
                };
                const jwtSecret = process.env.JWT_SECRET || " ";
                const token = jwt.sign(payload, jwtSecret);
                resp = {
                    access_key: token,
                    user: {
                        email: userNew.email,
                        name: userNew.name,
                    },
                    role: userNew.role,
                }
            }

            return successLogin(resp);
        } catch (error:any) {
            return failedRepo(error.message)
        }
    }
}

export default AuthRepository;