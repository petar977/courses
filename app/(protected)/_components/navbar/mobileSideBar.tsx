import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { MobileRoutes } from "./mobile-routes";

export const MobileSideBar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <SheetTitle></SheetTitle>
        <SheetDescription></SheetDescription>
        <div className="flex flex-col mt-6">
          <SheetClose>
            <MobileRoutes />
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};
