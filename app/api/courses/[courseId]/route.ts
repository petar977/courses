import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(req: NextRequest, { params }: { params: { courseId: string } }) {
    try {
        const user = await auth();
        const { courseId } = params;

        const existingUser = await getUserById(user?.user.id);

        if (!existingUser) {
            return new NextResponse("Unauthorized!", { status: 401 });
        }
        const userId = existingUser.id;
        
        const values = await req.json();
        const course = await db.course.update({
            where: {
                id: courseId,
                userId
            },
            data: {
                ...values
            }
        });
        return NextResponse.json(course);
    } catch (error) {
        console.log("[COURSE_ID]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { courseId: string } }) {
    try {
        const user = await auth();
        const { courseId } = params;

        if(!user) {
            return new NextResponse("Unauthorized!", { status: 401 });
        }

        const course = await db.course.findUnique({
            where: {
                id: courseId,
                userId: user.user.id
            },
        });

        if(!course){
            return new NextResponse("Not Fount", { status: 404});
        }

        const deletedCourse = await db.course.delete({
            where: {
                id: course.id
            }
        });

        return NextResponse.json(deletedCourse);

    } catch(error){
        console.log("[COURSE_ID_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}