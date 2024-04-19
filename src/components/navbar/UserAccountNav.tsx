"use client";

import { User } from "@/server/payload-types";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

interface UserAccountNavProps {
    user: User;
}

export default function UserAccountNav({ user }: UserAccountNavProps) {
    const { signOut } = useAuth();
    const { email } = user;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="overflow-visible">
                <Button variant="ghost" size="sm" className="relative">
                    My Account
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white w-60" align="end">
                <div className="flex gap-2 items-center justify-start p-2">
                    <div className="flex flex-col space-y-0.5 leading-none">
                        <p className="font-medium text-sm text-black">
                            {email}
                        </p>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/sell">Seller Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={signOut}>
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
