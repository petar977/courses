"use server"

import { currentUserRole } from "@/lib/auth"

export const admin = async () =>{
    const role = await currentUserRole();

    if (role === "Admin") {
        return { success: "Allowed!"};     
    }
    return { error: "Forbidden!"};
}
