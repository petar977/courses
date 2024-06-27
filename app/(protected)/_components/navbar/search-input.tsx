"use client"
import qs from "query-string";
import { useEffect, useState } from "react";
import { SearchIcon, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

export const SearchInput = () => {
    const router = useRouter();
    const [value, setValue] = useState("");
    const debouncedValue = useDebounce(value);
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const currentCategoryId = searchParams.get("categoryId");

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query: {
                categoryId: currentCategoryId,
                title: debouncedValue,
            }        
        }, { skipEmptyString: true, skipNull: true });
        router.push(url);
    }, [debouncedValue, currentCategoryId, router, pathname])


    return (
        <div className="relative">
            <SearchIcon className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search for a course"
                className="w-full md:w[300px] bg-[#02080e69] pl-9 rounded-full focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
            />
        </div>
    );
}

