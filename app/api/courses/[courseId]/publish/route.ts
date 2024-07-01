import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH (req: NextRequest, {params}: {params: {courseId: string;}} ){
    try{
        const user = await auth();

        if(!user) {
            return new NextResponse("Unauthorized", { status: 401});
        }

        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: user.user.id
            },
            include: {
                chapters: true
            }

        });

        if(!ownCourse) {
            return new NextResponse("Not found", { status: 404 });
        }
        
        const hasPusblishedChapter = ownCourse.chapters.some((chapter)=> chapter.isPublished);

        if(!ownCourse.title || !ownCourse.description || !ownCourse.ImageUrl || !ownCourse.categoryId || !hasPusblishedChapter){
            return new NextResponse("Missing required fields", { status: 401 });
        }
        const publishedCourse = await db.course.update({
            where: {
                id: params.courseId,
                userId: user.user.id
            },
            data: {
                isPublished: true
            }
        });
        return NextResponse.json(publishedCourse);

    } catch (error){
        console.log("[COURSE_ID_PUBLISH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}