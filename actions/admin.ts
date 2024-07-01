"use server"

import { auth } from "@/auth";
import { currentUserRole } from "@/lib/auth"

export const admin = async () =>{
    const role = await currentUserRole();

    if (role === "Admin") {
        return { success: "Allowed!"};     
    }
    return { error: "Forbidden!"};
}

export const userS = async () => {
    const session = await auth();
    return session?.user;
}
