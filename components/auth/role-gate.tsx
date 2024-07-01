"use client"
import { useCurrentRole } from "@/hooks/use-current-role";
import { Roles }  from "@prisma/client";
import { FormError } from "@/components/form-error";

interface RoleGateProps {
    children: React.ReactNode;
    allowedRole: Roles;
}

export const RoleGate = ({children, allowedRole}: RoleGateProps) => {
    const role = useCurrentRole();

    if (role !== allowedRole.role) {
        return (
            <FormError message="You do not have permission to view this content!" />

        )
    }
    return (
        <>
            {children}
        </>
    )
}