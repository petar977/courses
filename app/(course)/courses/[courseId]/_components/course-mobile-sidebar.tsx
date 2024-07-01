import { Menu } from "lucide-react";
import { Chapter, Course, UserProgress } from "@prisma/client";

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

import { CourseSideBar } from "./course-sidebar";

interface CourseMobileSideBarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseMobileSideBar = ({
  course,
  progressCount,
}: CourseMobileSideBarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetTitle>
      <SheetContent side="left" className="p-0 w-72" aria-describedby="">
        <CourseSideBar course={course} progressCount={progressCount} />
      </SheetContent>
      </SheetTitle>
    </Sheet>
  );
};
