import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const CoursesPage = async () => {
    const user = await auth();
    if(!user){
        return redirect("/");
    }

    const courses = await db.course.findMany({
        where: {
            userId: user.user.id
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return ( 
        <div className="p-6">
            <DataTable columns={columns} data={courses}/>
        </div>
     );
}
 
export default CoursesPage;