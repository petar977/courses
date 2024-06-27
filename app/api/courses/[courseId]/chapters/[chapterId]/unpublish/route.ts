import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH (req: NextRequest, {params}: {params: {courseId: string; chapterId: string}} ){
    try{
        const user = await auth();

        if(!user) {
            return new NextResponse("Unauthorized", { status: 401});
        }

        const ownCourse = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: user.user.id
            }
        });

        if(!ownCourse) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const unpublishedChapter = await db.chapter.update({
            where: {
                id: params.chapterId,
                courseId: params.courseId
            },
            data: {
                isPublished: false
            }
        });

        const publishedChapterInCourse = await db.chapter.findMany({
            where: {
                courseId: params.courseId,
                isPublished: true
            }
        });
        
        if(!publishedChapterInCourse.length){
            await db.course.update({
                where: {
                    id: params.courseId
                },
                data: {
                    isPublished: false
                }
            })
        }

        return NextResponse.json(unpublishedChapter);
    }catch (error){
        console.log("[CHAPTER_UNPUBLISH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}