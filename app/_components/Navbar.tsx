"use client";

import React, { useState } from "react";
import { Menu, MenuItem } from  "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { SignedIn, SignInButton, UserButton, useSession } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "./Logo";
import { Skeleton } from "@/components/ui/skeleton";

const links = [
    {
        path: "/dashboard",
        label: "Dashboard"
    },
    {
        path: "/questions",
        label: "Questions"
    },
    {
        path: "/pricing",
        label: "Pricing"
    },
    {
        path: "/how-it-works",
        label: "How it works"
    }
]

export function NavbarDemo() {
    return (
        <div className="relative w-full flex items-center justify-center">
            <Navbar className="top-5" />
        </div>
    );
}

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    const { isLoaded, session, isSignedIn } = useSession();

    return (
        <div
        className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
        >
        <Menu setActive={setActive}>
            <div className="flex items-center justify-between w-full text-sm">
                <Logo />
                <div className="flex gap-5">
                    {
                        links.map((link, index) => (
                            <Link key={index} href={link.path}>
                                <MenuItem setActive={setActive} active={active} item={link.label} />
                            </Link>
                        ))
                    }
                </div>
                <div className="flex items-center justify-center">
                    {
                        isSignedIn ? (
                            <>
                                {
                                    isLoaded ? (
                                        <UserButton />
                                    ):(
                                        <Skeleton className="h-8 w-8 rounded-full" />
                                    )
                                }
                            </>
                        ) : (
                            <SignInButton forceRedirectUrl={"/dashboard"}>
                                <Button className="w-[100px] h-[42px] rounded-full text-sm">
                                    Sign in
                                </Button>
                            </SignInButton>
                        )
                    }
                </div>
            </div>
        </Menu>
        </div>
    );
}
