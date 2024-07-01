
import { FaUser } from "react-icons/fa";
import { ExitIcon, GearIcon } from "@radix-ui/react-icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
//import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import { LoginButton } from "./login-button";
import { Button } from "../ui/button";
import { auth } from "@/auth";
import Link from "next/link";

export const UserButton = async () => {
    const session = await auth();
    const user = session?.user;

    return (
        <div className="flex items-center justify-end gap-x-2 ml-4">
            {!user && (
                <LoginButton mode="modal" asChild>
                    <Button variant="primary" size="sm">Login</Button>
                </LoginButton>
            )}
            {!!user && (
                <DropdownMenu>
                    <DropdownMenuTrigger >
                        <Avatar>
                            <AvatarImage src={user?.image || ""} />
                            <AvatarFallback className="bg-sky-500">
                                <FaUser className="text-white" />
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40" align="end">
                        <Link href="/settings">
                            <DropdownMenuItem>
                                <GearIcon className="h-4 w-4 mr-2" />
                                Settings
                            </DropdownMenuItem>
                        </Link>
                        <LogoutButton>
                            <DropdownMenuItem>
                                <ExitIcon className="h-4 w-4 mr-2" />
                                Logout
                            </DropdownMenuItem>
                        </LogoutButton>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}