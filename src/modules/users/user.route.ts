import { Router, type Request, type Response } from "express";
import { userController } from "./user.controller";

const router = Router()

router.post("/register",userController.registerUser)

export const userRoutes=router;