import { auth } from "@/auth";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises';

export async function PATCH(req: NextRequest, { params }: { params: { courseId: string; chapterId: string; } }) {
    try {
        const user = await auth();
        const { courseId, chapterId } = params;
        const data = await req.formData();
        const existingUser = await getUserById(user?.user.id);

        if (!existingUser) {
            return new NextResponse("Unauthorized!", { status: 401 });
        }
        
        const file: File | null = data.get('file') as unknown as File

        if (!file) {
            return NextResponse.json({ success: false })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // With the file data in the buffer, you can do whatever you want with it.
        // For this, we'll just write it to the filesystem in a new location
        const path = `C:/Users/Vujacic/Desktop/mynewapp/public/${file.name}`
        await writeFile(path, buffer)

        const chapter = await db.chapter.update({
            where: {
                id: chapterId,
                courseId: courseId,
            },
            data: {
                videoUrl: file.name
            }
        });
        return NextResponse.json(chapter);

    } catch (error) {
        console.log("[CHAPTER_VIDEO]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}