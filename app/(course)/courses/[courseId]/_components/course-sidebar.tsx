import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import { CourseSideBarItem } from "./course-sidebar-item";

interface CourseSideBarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null;
        })[]
    };
    progressCount: number;
}

export const CourseSideBar = async ({course,progressCount}: CourseSideBarProps) => {
    const user = await auth();
    
    if (!user?.user.id) {
        return redirect("/");
    }

    const purchase = await db.purchase.findUnique({
        where: {
            userId_courseId: {
                userId: user.user.id,
                courseId: course.id
            }
        }
    });

    return ( 
        <div className="h-full border-r flex flex-col overflow-y-auto">
            <div className="p-8 flex flex-col border-b">
                <h1 className="font-semibold">
                    {course.title}
                </h1>
                {/* check purchase and add progress */}
            </div>
            <div className="flex flex-col w-full">
                {course.chapters.map(( chapter ) => (
                    <CourseSideBarItem 
                    key={chapter.id}
                    id={chapter.id}
                    label={chapter.title}
                    isCompleted= {!!chapter?.userProgress?.[0]?.isCompleted}
                    courseId={course.id}
                    isLocked={!chapter.isFree && !purchase}
                    />
                ))}
            </div>
        </div>
     );
}
 
