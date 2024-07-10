import { NavRoutes } from "@/app/(protected)/_components/navbar/nav-routes";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { CourseMobileSideBar } from "./course-mobile-sidebar";
import { MobileSideBar } from "@/app/(protected)/_components/navbar/mobileSideBar";
import { UserButton } from "@/components/auth/user-button";
import { SwitchMode } from "@/app/(protected)/_components/navbar/switch-mode";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseNavbar = ({ course, progressCount }: CourseNavbarProps) => {
  return (
    <div className="border-b p-4 bg-[#252731]">
      <div className="flex items-center justify-between h-full md:hidden">
        <CourseMobileSideBar course={course} progressCount={progressCount} />
        <div className="flex items-center gap-x-3">
          <SwitchMode />
          <UserButton />
          <MobileSideBar />
        </div>
      </div>
      <div className=" hidden items-center w-full h-full md:flex">
            <NavRoutes />
      </div>
    </div>
  );
};
