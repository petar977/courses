
import { Logo } from "@/app/(protected)/_components/navbar/logo";
import { auth } from "@/auth";
import { NavRoutes } from "@/app/(protected)/_components/navbar/nav-routes";


export const Navbar = async () => {
    const user = await auth();
    return (
        <nav className="fixed top-0 w-full h-20 z-50 bg-[#252731] px-2 lg:px-4 flex justify-between items-center shadow-sm">
            <Logo />
            <NavRoutes />
            
        </nav>
    );
}