import { db } from "@/lib/db";
import { Categories } from "./_components/categories";
import { SearchInput } from "../_components/navbar/search-input";
import { auth } from "@/auth";
import { getCourses } from "@/actions/get-courses";
import { redirect } from "next/navigation";
import { CoursesList } from "@/components/courses-list";

interface SearchPageProps{
    searchParams: {
        title: string;
        categoryId: string
    }
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
    const user = await auth();

    if(!user?.user.id) {
        return redirect("/")
    }
    const userId = user.user.id;
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({userId, ...searchParams});

  return (
    <>
        <div className="px-6 pt-6 md:mb-0 md:flex justify-center">
            <SearchInput />
        </div>
      <div className="p-6 space-y-4 ">
        <Categories items={categories} />
        <CoursesList items={courses}/>
      </div>
    </>
  );
};

export default SearchPage;
