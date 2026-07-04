import { Router, type Request, type Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import config from "../../config";
import { userService } from "./user.service";

const registerUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const user = await userService.registerUserIntoDB(payload);

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "User registered successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
        success:false,
        message:(error as Error).message
    })
  }
};

export const userController = {
  registerUser,
};
