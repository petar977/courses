"use client"

import axios from "axios";
import { CloudUpload, ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import Image from "next/image";

interface ImageFormProps {
    initialData: Course;
    courseId: string;
};

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [file, setFile] = useState<File>()
    const toggleEdit = () => {
        setIsEditing((current) => !current);
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file) return
        try {
            const data = new FormData()
            data.set('file', file)
            await axios.patch(`/api/video/${courseId}`, data);
            toast.success("Course updated")
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("Something went wrong!")
        }
    }

    return (
        <div className="mt-6 border bg-slate-600 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Course Image
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && !initialData.ImageUrl && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add an image
                        </>
                    )}
                    {!isEditing && initialData.ImageUrl && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit image
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                !initialData.ImageUrl ? (
                    <div className="flex items-center justify-center h-60 bg-gray-700 rounded-md mt-1">
                        <ImageIcon className="h-10 w-10 text-slate-500" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <Image src={`/${initialData.ImageUrl}`} alt="Course Image" fill sizes="fill" />
                    </div>
                )
            )}
            {isEditing && (
                <form onSubmit={onSubmit} className="space-y-4 mt-4">
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <CloudUpload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                            <input id="dropzone-file" className="hidden" type="file"
                                onChange={(e) => setFile(e.target.files?.[0])}
                            />
                        </label>

                    </div>

                    <div className="flex items-center gap-x-2">
                        <Button type="submit" variant="primary">
                            Upload
                        </Button>
                    </div>
                    <div className="text-xs text-muted-foreground mt-4">
                        16:9 aspect ratio recommended
                    </div>
                </form>

            )}
        </div>
    )
}