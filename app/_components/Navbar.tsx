"use client";

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from  "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function NavbarDemo() {
    return (
        <div className="relative w-full flex items-center justify-center">
            <Navbar className="top-5" />
        </div>
    );
}

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div
        className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50 ", className)}
        >
        <Menu setActive={setActive}>
            <div className="flex items-center justify-between w-full">
            <div className="text-black dark:text-white">
                    Logo
                </div>
                <div className="flex gap-5">
                    <MenuItem setActive={setActive} active={active} item="Dashboard" />
                    <MenuItem setActive={setActive} active={active} item="Products" />
                    <MenuItem setActive={setActive} active={active} item="Pricing" />
                </div>
                <div className="text-black dark:text-white">
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignInButton>
                        <Button className="w-[100px] h-[45px] rounded-full">
                            Sign in
                        </Button>
                    </SignInButton>
                </div>
            </div>
        </Menu>
        </div>
    );
}
