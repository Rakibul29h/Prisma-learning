import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import type { ILoginUser } from "./auth.interface"

const loginUser=async(payload:ILoginUser)=>{

    const{email,password}=payload;

    // is exists;

    const user= await prisma.user.findUniqueOrThrow({
        where: {email},
        
    })

    const isPasswordMatch= await bcrypt.compare(password,user.password);

    if(!isPasswordMatch){
        throw new Error("Password not match")
    }

    return user;
}

export const authService={
    loginUser
}