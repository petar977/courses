"use client"

import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation";

interface NavItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
}

export const NavItem = ({ icon: Icon, label, href }: NavItemProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const isActive = (pathname === "/" && href === "/")
        || pathname === href
        || pathname.startsWith(`${href}/`);

    const onClick = () => {
        router.push(href)
    }

    return (
        <Button onClick={onClick}
            type="button"
            className="flex items-center"
            variant={isActive ? "default" : "outline"}
        >
            <div className="flex items-center gap-x-2">
                <Icon size={20} className="" />
                {label}
            </div>

        </Button>
    )
}