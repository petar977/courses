import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { BookOpen } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";

interface CourseCardProps {
    id: string;
    title: string;
    imageUrl: string;
    chaptersLenght: number;
    price: number;
    progress: number | null;
    category: string;
}

export const CourseCard = ({id,category,chaptersLenght,imageUrl,price,progress,title}:CourseCardProps) => {
    return ( 
        <Link href={`/courses/${id}`}>
           <div className="group hover:shadow-sm transition overflow-hidden rounded-lg border p-3 h-full ">
                <div className="relative w-full aspect-video rounded-md overflow-hidden">
                    <Image 
                        fill
                        sizes="fill"
                        className="object-cover"
                        alt={title}
                        src={`/${imageUrl}`}
                    />
                </div>
                <div className="flex flex-col pt-2">
                    <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                        {title}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {category}
                    </p>
                    <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                        <div className="flex items-center gap-x-1 text-slate-500">
                            <Badge size="sm" className="rounded-full bg-indigo-300">
                                <BookOpen className="size-4"/>
                            </Badge>  
                            <span>
                                {chaptersLenght} {chaptersLenght === 1 ? "Chapter" : "Chapters"}
                            </span>   
                        </div>
                    </div>
                    {progress !== null ? (
                        <div></div>
                    ) : (
                        <p className="text-md md:text-sm font-medium text-slate-200">
                            {formatPrice(price)}
                        </p>
                    )}
                </div>
           </div>
        </Link>
     );
}
 
