"use client"

import { LogOutIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const SwitchMode = () => {
    const pathname = usePathname();

    const isDevPage = pathname?.startsWith("/dev");
    const isGuestPage = pathname?.includes("/courses");

    return (
        <div className="flex gap-x-2 ml-auto">
            {isDevPage || isGuestPage ? (
                <Link href="/">
                    <Button variant="outline">
                        <LogOutIcon className="h-4 w-4 mr-2" />
                        Exit
                    </Button>
                </Link>
            ): (
                <Link href="/dev/courses">
                    <Button variant="outline">
                        Owner Mode
                    </Button>
                </Link>
            )}
            
        </div>
    )
}