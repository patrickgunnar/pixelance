"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Category = (typeof PRODUCT_CATEGORIES)[number];

interface NavItemProps {
    category: Category;
    handleOpen: () => void;
    isOpen: boolean;
    isAnyOpen: boolean;
}

export default function NavItem({
    category,
    isAnyOpen,
    isOpen,
    handleOpen,
}: NavItemProps) {
    return (
        <div className="flex">
            <div className="relative flex items-center">
                <Button
                    className="gap-1.5"
                    onClick={handleOpen}
                    variant={isOpen ? "secondary" : "ghost"}
                >
                    {category.label}
                    <ChevronDown
                        className={cn(
                            "text-muted-foreground transition-all h-4 w-4",
                            {
                                "-rotate-180": isOpen,
                            }
                        )}
                    />
                </Button>
            </div>
            {isOpen && (
                <div
                    className={cn(
                        "absolute text-sm text-muted-foreground top-full inset-x-0",
                        {
                            "animate-in fade-in-10 slide-in-from-top-5":
                                !isAnyOpen,
                        }
                    )}
                >
                    <div
                        className="absolute bg-white shadow top-1/2 inset-0"
                        aria-hidden="true"
                    />
                    <div className="relative bg-white">
                        <div className="px-8 mx-auto max-w-7xl">
                            <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                                <div className="grid grid-cols-3 gap-x-8 col-span-4 col-start-1">
                                    {category.featured.map((feature) => {
                                        const { name, href, image } = feature;

                                        return (
                                            <div
                                                key={name}
                                                className="relative group text-base sm:text-sm"
                                            >
                                                <div className="relative aspect-video bg-slate-100 rounded-lg overflow-hidden group-hover:opacity-75">
                                                    <Image
                                                        className="object-cover object-center"
                                                        src={image}
                                                        alt={name}
                                                        fill
                                                    />
                                                </div>
                                                <Link
                                                    href={href}
                                                    className="block font-medium text-slate-900 mt-6"
                                                >
                                                    {name}
                                                </Link>
                                                <p className="mt-1" aria-hidden="true">Buy Now</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
