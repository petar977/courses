import { db } from "@/lib/db";

export const getUserByEmail = async (email: string ) => {
    try{
        const user = await db.user.findUnique({
            where: { email }         
        })
        return user;
    } catch{
        return null;
    }
}

export const getUserById = async (id: string | undefined) => {
    try{
        const user = await db.user.findUnique({
            where: { id },
            include: {role: true}         
        })
        return user;
    } catch{
        return null;
    }
}

export const getUserRole = async (id: string)=>{
    try{
        const role = await db.userRoles.findFirstOrThrow({
            where: { userId: id},
            include: { role: true}
        })
        return role;
    }catch{
        return null;
    }
}