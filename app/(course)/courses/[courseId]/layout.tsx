import { getProgress } from "@/actions/get-progress";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { CourseSideBar } from "./_components/course-sidebar";
import { CourseNavbar } from "./_components/course-navbar";


const CourseLayout = async ({ children, params }: {children: React.ReactNode, params:{ courseId: string;}}) => {
    
    const user = await auth();

    if(!user?.user.id){
        return redirect("/");
    }

    const course = await db.course.findUnique({
        where: {
            id: params.courseId
        },
        include: {
            chapters: {
                where: {
                    isPublished: true
                },
                include: {
                    userProgress: {
                        where: {
                            userId: user.user.id
                        }
                    }
                },
                orderBy: {
                    position: "asc"
                },
            },
            
        }, 
    });

    if (!course) {
        return redirect("/");
    }

    const progressCount = await getProgress(user.user.id, course.id);
    return ( 
      <div className="h-full">
        <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
            <CourseNavbar 
            course={course}
            progressCount={progressCount}
            />
        </div>
        <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
            <CourseSideBar 
                course={course}
                progressCount={progressCount}
            />
        </div>
        <main className="md:pl-80 pt-[80px] h-full">
        {children}
        </main>
        
      </div>
     );
  }
   
  export default CourseLayout;