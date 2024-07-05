import { db } from "@/lib/db";
import { Category, Chapter, Course, UserProgress } from "@prisma/client";
import { getProgress } from "./get-progress";

type CourseWithCategory = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourses: CourseWithCategory[];
};

export const getDashboardCourses = async (
  userId: string
): Promise<DashboardCourses> => {
  try {
    const puchasedCourses = await db.purchase.findMany({
      where: {
        userId: userId,
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    });

    const courses = puchasedCourses.map(
      (purchase) => purchase.course
    ) as CourseWithCategory[];

    for (let course of courses ) {
        const progress = await getProgress(userId, course.id);
        course["progress"] = progress;
    }
    const completedCourses = courses.filter((course) => course.progress === 100)
  
    return {completedCourses};
} catch (error) {
    console.log("[GET_DASHBOARD_COURSES", error);
    return {
      completedCourses: [],
    };
  }
};
