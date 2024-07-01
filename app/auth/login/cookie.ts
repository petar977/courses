import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import * as jose from 'jose'
export async function getCookie(){
    const token = cookies().get("Hello")
    
    if (!token){
        return false;
    }
    const jwtConfig = {
        secret: new TextEncoder().encode(process.env.AUTH_SECRET),
      }
    
    try{
        await jose.jwtVerify(token.value, jwtConfig.secret);
    }catch(e){
        return false;
    }
    // const secret = process.env.AUTH_SECRET || "";
    // try{
    //     verify(token.value,secret);
    // }catch(e){
    //     return false;
    // }
    return true;
}