import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { auth } from "@/auth";
import { CoursesList } from "@/components/courses-list";
import { Clock } from "lucide-react";
import { InfoCard } from "./_components/info-card";


export default async function Dashboard() {
const user = await auth();
  
  const userId = user?.user.id!;

  const { completedCourses } = await getDashboardCourses(userId);

  return (
    <div className="p-6 space-y-4 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="Your Courses"
          numberOfItems={completedCourses.length}
        />
      </div>
      <CoursesList items={[...completedCourses]} />
    </div>
  );
}
