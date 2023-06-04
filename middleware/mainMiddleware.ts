import { NextFunction, Request, Response } from "express";
import { createPaginator } from "prisma-pagination";

export const pagination = (req: Request, res: Response, next: NextFunction) =>{
    const page:any = req.query.page || 1;
    const perPage:any = req.query?.perPage || 100;
    req.body.paginate = createPaginator({page, perPage});

    next();
}