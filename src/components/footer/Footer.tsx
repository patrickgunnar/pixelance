"use client";

import { usePathname } from "next/navigation";
import MaxWidthWrapper from "../widthWrapper/MaxWidthWrapper";
import { Icons } from "../icons/Icons";
import Link from "next/link";

export default function Footer() {
    const pathname = usePathname();
    const pathToMinimize = ["/verify-email", "/sign-in", "sign-up"];

    return (
        <footer className="bg-white flex-grow-0">
            <MaxWidthWrapper>
                <div className="border-t border-green-200">
                    {!pathToMinimize.includes(pathname) && (
                        <div className="pb-8 pt-16">
                            <div className="flex justify-center">
                                <Icons.logo className="h-12 w-auto" />
                            </div>
                        </div>
                    )}
                    {!pathToMinimize.includes(pathname) && (
                        <div>
                            <div className="relative flex items-center px-6 py-6 sm:py-8 lg:mt-0">
                                <div className="absolute inset-0 overflow-hidden rounded-lg">
                                    <div
                                        aria-hidden="true"
                                        className="absolute inset-0 bg-green-50 bg-gradient-to-br bg-opacity-90"
                                    />
                                </div>
                                <div className="relative text-center mx-auto max-w-sm">
                                    <h3 className="font-semibold text-green-900">
                                        Become a seller
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-2">
                                        If you&apos;d like to sell high-quality
                                        assets, you can do it in minutes.{" "}
                                        <Link
                                            href="/sign-in?as-seller"
                                            className="font-medium text-black whitespace-nowrap hover:text-green-900"
                                        >
                                            Get started &rarr;
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="py-10 md:flex md:items-center md:justify-between">
                    <div className="text-center md:text-left">
                        <p className="text-sm text-muted-foreground">
                            &copy; {new Date().getFullYear()} All Rights
                            Reserved
                        </p>
                    </div>
                    <div className="flex items-center justify-center mt-4 md:mt-0">
                        <div className="flex space-x-8">
                            <Link
                                href="#"
                                className="text-sm text-muted-foreground hover:text-green-900"
                            >
                                Terms & Services
                            </Link>
                            <Link
                                href="#"
                                className="text-sm text-muted-foreground hover:text-green-900"
                            >
                                About US
                            </Link>
                            <Link
                                href="#"
                                className="text-sm text-muted-foreground hover:text-green-900"
                            >
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </footer>
    );
}
