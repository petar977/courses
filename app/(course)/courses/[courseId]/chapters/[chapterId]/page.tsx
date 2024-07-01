import { auth } from "@/auth";
import { redirect } from "next/navigation";

const ChapterIdPage = async ({params}: {params: {courseId: string, chapterId: string}}) => {
    const user = await auth();

    if(!user?.user.id) {
        return redirect("/");
    }
    
    return (
        <div>
            Chapters Page
        </div>
    )
}

export default ChapterIdPage;