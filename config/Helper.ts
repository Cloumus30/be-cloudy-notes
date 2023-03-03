import { ValidationError } from "express-validator";
import { failedRepo } from "./response";

export const paginate = (query:any)=>{
    const perPage = parseInt(query.perPage) ?? 10;
    const page = parseInt(query.page) ?? 1;
    const take = perPage;
    const skip = (perPage * page) - perPage;

    return {
        take,
        skip,
        page,
        perPage,
    }
}

export const exclude = (model:any, keys:string[]) =>{
    for (let key of keys) {
        delete model[key];
    }
    return model;
}

export const errorFormatter = ({ location, msg, param, value, nestedErrors }: ValidationError) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return failedRepo(`${param} ${msg}`);
  };