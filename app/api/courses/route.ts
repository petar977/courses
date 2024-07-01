import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try{
        const user = await auth();
        const { title } = await req.json();
        const existingUser = await getUserById(user?.user.id);

        if (!existingUser) {
            return new NextResponse("Unauthorized!", { status: 401 });
        }
        
        const userId = existingUser.id
        const course = await db.course.create({
            data: {
                userId,
                title
            }
        });

        return NextResponse.json(course);

    }catch (error){
        console.log("[COURSES]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}