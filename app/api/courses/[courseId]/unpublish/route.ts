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
        });

        if(!ownCourse) {
            return new NextResponse("Not found", { status: 404 });
        }
        
        const unpublishedCourse = await db.course.update({
            where: {
                id: params.courseId,
                userId: user.user.id
            },
            data: {
                isPublished: false
            }
        });
        return NextResponse.json(unpublishedCourse);

    } catch (error){
        console.log("[COURSE_ID_UNPUBLISH]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}