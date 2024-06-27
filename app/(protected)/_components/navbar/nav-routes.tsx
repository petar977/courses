"use client"

import { BarChart, Compass, Layout, List } from "lucide-react";
import { NavItem } from "./nav-item";
import { usePathname } from "next/navigation";
import { SearchInput } from "./search-input";
import { SwitchMode } from "./switch-mode";
import { UserButton } from "@/components/auth/user-button";

const guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/"
    },
    {
        icon: Compass,
        label: "Browse",
        href: "/search"
    }
]
const devRoutes = [
    {
        icon: List,
        label: "Courses",
        href: "/dev/courses"
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/dev/analytics"
    }
]

export const NavRoutes = () => {
    const pathname = usePathname();

    const isDevMode = pathname?.includes("/dev");
    const isSearchPage = pathname === "/search"
    const routes = isDevMode ? devRoutes : guestRoutes;

    return (
        <>
        {isSearchPage && (
            <div className="hidden md:block">
                <SearchInput />
            </div>
        )}
        <div className="flex mx-auto gap-x-2">
            {
                routes.map((route) => (
                    <NavItem key={route.href} icon={route.icon} label={route.label} href={route.href}/>
                ))
            }
        </div>
        <SwitchMode />
            {/* <UserButton /> */}
        </>
    )
}