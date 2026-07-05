import type { Response } from "express";

interface  IResponseData <T>{
    success:boolean,
    statusCode:number,
    message:string,
    data:T;
    meta?:{
        page:number,
        limit:number,
        total:number
    }
}

export const sendResponse= <T>(res:Response,data:IResponseData<T>)=>{
    res.status(data.statusCode).json({
        success:data.success,
        statusCode:data.statusCode,
        mesage:data.message,
        data:data.data,
        meta:data.meta
    })
}