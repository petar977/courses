"use client"

import { LogOutIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";

export const SwitchMode = () => {
    const user = useCurrentUser();
    const pathname = usePathname();

    const isDevPage = pathname?.startsWith("/dev");
    const isGuestPage = pathname?.includes("/courses");

    return (
        <div className="flex gap-x-2 ">
            {isDevPage || isGuestPage ? (
                <Link href="/">
                    <Button variant="outline">
                        <LogOutIcon className="h-4 w-4 mr-2" />
                        Exit
                    </Button>
                </Link>
            ): user?.role === "Admin" ? (
                <Link href="/dev/courses">
                    <Button variant="outline">
                        Owner Mode
                    </Button>
                </Link>
            ) : null}
            
        </div>
    )
}