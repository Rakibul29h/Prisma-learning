import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../Utils/catchAsync";
import { authService } from "./auth.service";
import { sendResponse } from "../../Utils/sendResponse";

const loginUser= catchAsync(async(req:Request,res:Response,next:NextFunction)=>{
    const payload=req.body;

    const loginResult= await authService.loginUser(payload);

    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"User login successfully",
        data:{loginResult},
    })
})

export const authController={
    loginUser
}