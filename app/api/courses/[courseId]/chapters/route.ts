import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, {params}:{ params: {courseId: string}}) {
    try{
        const user = await auth();
        const { title } = await req.json();

        if(!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        
        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: user.user.id
            }
        });

        if (!courseOwner) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        
        const lastChapter = await db.chapter.findFirst({
            where: {
                courseId: params.courseId,
            },
            orderBy:{
                position: "desc",
            }
        });

        const newPosition = lastChapter ? lastChapter.position + 1 : 1;

        const chapter = await db.chapter.create({
           data: {
            title,
            courseId: params.courseId,
            position: newPosition
           }
        });

        return NextResponse.json(chapter);

    } catch(error){
        console.log("[CHAPTERS]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}