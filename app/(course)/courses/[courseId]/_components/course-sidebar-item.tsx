"use client"

import { cn } from "@/lib/utils";
import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseSideBarItemProps {
    label: string;
    id: string;
    isCompleted: boolean;
    courseId: string;
    isLocked: boolean;
}

export const CourseSideBarItem = ({label,id,courseId,isCompleted,isLocked}: CourseSideBarItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const Icon = isLocked ? Lock : (isCompleted ? CheckCircle : PlayCircle)
    
    const isActive = pathname?.includes(id);

    const onClick = () => {
        router.push(`/courses/${courseId}/chapters/${id}`)
    }


    return (
        <button type="button" onClick={onClick} className={cn("flex items-center pl-6 gap-x-2 text-sm font-[500] transition-all hover:bg-slate-300/20",
            isActive && "bg-sky-200/20 hover:bg-sky-200/20",
            isCompleted && "text-emerald-700 hover:text-emerald-700",
            isCompleted && isActive && "bg-emerald-200/20"
        )}>
            <div className="flex items-center gap-x-2 py-4">
                <Icon size={22} className={cn("text-slate-400", 
                    isActive && "text-slate-500",
                    isCompleted && "text-emerald-700")} />
                {label}
            </div>
            <div className={cn("ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
                isActive && "opasity-100",
                isCompleted && "border-emerald-700"
            )} />

            
        </button>
    )
}