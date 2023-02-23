import { NextFunction, Request, Response } from "express";

export const checkFile = (fieldName:string) => {
    return (req: Request, res:Response, next:NextFunction) =>{
        try {
            if(!req.files){
               return res.status(400).json(
                    {
                        errors:[
                            {
                                msg: " ⚠️ Required File",
                                param: fieldName,
                                location: "files"
                            }
                        ]
                    }
                )
            }
            const check = fieldName in req.files!;
            if(!check){
               return res.status(400).json(
                    {
                        errors:[
                            {
                                msg: " ⚠️ Required File",
                                param: fieldName,
                                location: "files"
                            }
                        ]
                    }
                )
            }
            next();
        } catch (error: any) {
            console.log('⚠️ ' + error)
            return res.status(403).json({
                error:true,
                message: ` ⚠️ ${error.message}`,
            })
        }
    }
}