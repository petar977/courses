import { NavRoutes } from "@/app/(protected)/_components/navbar/nav-routes";
import { Chapter, Course, UserProgress } from "@prisma/client"
import { CourseMobileSideBar } from "./course-mobile-sidebar";

interface CourseNavbarProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null
        })[];
    };
    progressCount: number;
}

export const CourseNavbar = ({course,progressCount}: CourseNavbarProps) => {

    return (
        <div className="p-4 border-b h-full flex items-center shadow-sm">
            <CourseMobileSideBar 
                course={course}
                progressCount={progressCount}
            />
            <NavRoutes/> 
        </div>
    )
}