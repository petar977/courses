"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
import { NavItem } from "./nav-item";
import { usePathname } from "next/navigation";
import { SwitchMode } from "./switch-mode";
import { UserButton } from "@/components/auth/user-button";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];
const devRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/dev/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/dev/analytics",
  },
];

export const NavRoutes = () => {
  const pathname = usePathname();

  const isDevMode = pathname?.includes("/dev");
  const routes = isDevMode ? devRoutes : guestRoutes;

  return (
    <div className="flex items-center w-full">
      <div className="flex gap-x-2 justify-center w-full">
        {routes.map((route) => (
          <NavItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        ))}
      </div>
      <div className="flex items-center justify-end">
        <SwitchMode />
        <UserButton />
      </div>
    </div>
  );
};
