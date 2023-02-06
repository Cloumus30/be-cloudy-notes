import { Response } from "express"

export const successLogin = (data:any = null) =>{
    return {
        error:false,
        message: '👍 Success Login',
        data
    }
}

export const successGetRepo = (data: any = null)=>{
    return {
        error:false,
        message: '👍 Success Get Data',
        data
    }
}

export const successSaveRepo = (data:any = null)=>{
    return {
        error: false, 
        message: '👍 Success Save Data',
        data
    }
}

export const successUpdateRepo = (data:any = null) => {
    return {
        error: false,
        message: '👍 Success Update Data',
        data
    }
}

// Failed Response
export const failedRepo = (message:string = '⚠️ Failed Request', code:any = 10) => {
    return {
        error: true,
        message: `⚠️ ${message}`,
        code,
    }
}

// Controller Response
export const resController = (res: Response, data:any , successCode: number =200, errorCode:number = 400) => {
    if(data.error){
        console.error(data.message);
        res.status(errorCode).json(data)
    }else{
        res.status(successCode).json(data)
    }
}