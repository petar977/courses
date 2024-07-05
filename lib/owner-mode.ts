import { redirect } from "next/navigation";
import { db } from "./db";

export const isAdmin = async (userId?: string | null) => {
    if(!userId) {
        return redirect("/");
    }
    const user = await db.user.findUnique({
        where:{
            id: userId
        },
        include: {
            role: true
        },
    
    });

    if (!user?.role[0]){
        return false;
    }
    return true;
}