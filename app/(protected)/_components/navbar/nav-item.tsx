"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const NavItem = ({ icon: Icon, label, href }: NavItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 cursor-pointer",
        isActive
          ? "bg-primary text-primary-foreground shadow hover:bg-primary/90"
          : "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
      )}
    >
      <div className="flex items-center gap-x-2">
        <Icon size={20} className="" />
        {label}
      </div>
    </div>
  );
};
