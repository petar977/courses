import { Logo } from "@/app/(protected)/_components/navbar/logo";
import { NavRoutes } from "@/app/(protected)/_components/navbar/nav-routes";
import { UserButton } from "@/components/auth/user-button";
import { MobileSideBar } from "./mobileSideBar";
import { SwitchMode } from "./switch-mode";

export const Navbar = async () => {

  return (
    <>
      <div className="fixed top-0 w-full h-20 z-50 bg-[#252731] px-2 lg:px-4 flex justify-between items-center shadow-sm">
        <Logo />
        <NavRoutes />
      </div>

      <div className="md:hidden fixed top-0 w-full h-20 z-50 bg-[#252731] px-2 lg:px-4 flex items-center justify-between shadow-sm">
        <Logo />
        <div className="flex gap-x-3">
          <SwitchMode />
          <UserButton />
          <MobileSideBar />
        </div>
      </div>
    </>
  );
};
