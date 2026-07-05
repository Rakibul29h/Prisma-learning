import { Router, type NextFunction, type Request, type Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import { userService } from "./user.service";
import { catchAsync } from "../../Utils/catchAsync";
import { sendResponse } from "../../Utils/sendResponse";



const registerUser=catchAsync( async (req: Request, res: Response,next:NextFunction) => {
 
    const payload = req.body;

    const user = await userService.registerUserIntoDB(payload);

    sendResponse(res,{
      success:true,
      statusCode:201,
      message:"User registerd Successfully",
      data:{
        user
      }
    })
  
})
export const userController = {
  registerUser,
};
