import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken"
import config from "../config";

export const jwtSign=(payload:JwtPayload,secret:string,expire:SignOptions)=>{
    return  jwt.sign(payload, secret, {
    expiresIn: expire,
  } as SignOptions);
}

export const verifyJWT=(token:string,secret:string)=>{
  try {
    return jwt.verify(token,secret)
  } catch (error) {
    console.log(error);
    throw new Error("Invalid token");
  }
}