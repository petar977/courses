import { db } from "@/lib/db";
import { Attachment } from "@prisma/client";

interface GetChapterProps {
    userId: string;
    courseId: string;
    chapterId: string;
}

export const getChapter = async ({
    userId, courseId, chapterId
}: GetChapterProps) => {
    try {
        const purchase = await db.purchase.findUnique({
            where: {
                userId_courseId: {
                    userId, courseId
                }
            }
        });

        const course = await db.course.findUnique({
            where: {
                isPublished: true,
                id: courseId
            },
            select: {
                price: true
            }
        });

        const chapter = await db.chapter.findUnique({
            where: {
                id: chapterId,
                isPublished: true
            }
        });

        if(!chapter || !course) {
            throw new Error("Chapter or course not found!");
        }

        let attachments: Attachment[] = []

        if (purchase) {
            attachments = await db.attachment.findMany({
                where: {
                    courseId: courseId,
                }
            });
        }

        const userProgress = await db.userProgress.findUnique({
            where: {
                userId_chapterId: {
                    userId, chapterId
                }
            }
        });

        return { chapter, course, attachments, userProgress}

    } catch (error) {
        console.log("[GET_CHAPTER]", error);

        return {
            chapter: null,
            course: null,
            attachments: [],
            userProgress: null,
            purchase: null
        }
    }
}