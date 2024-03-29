import Link from "next/link";
import MaxWidthWrapper from "../widthWrapper/MaxWidthWrapper";
import { Icons } from "../icons/Icons";
import NavItems from "./NavItems";
import { buttonVariants } from "../ui/button";
import Cart from "../cards/Cart";

export default function Navbar() {
    const user = null;

    return (
        <nav className="sticky bg-white inset-x-0 top-0 h-16 z-50">
            <header className="relative bg-white">
                <MaxWidthWrapper>
                    <div className="border-b border-slate-200">
                        <div className="flex items-center h-16">
                            {/* TO-DO: Mobile Nav */}
                            <div className="flex ml-4 lg:ml-0">
                                <Link href="/">
                                    <Icons.logo className="text-green-800 h-10 w-10" />
                                </Link>
                            </div>
                            <div className="hidden z-50 lg:block lg:self-stretch lg:ml-8">
                                <NavItems />
                            </div>
                            <div className="flex items-center ml-auto">
                                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                    {!user && (
                                        <Link
                                            href="/sign-in"
                                            className={buttonVariants({
                                                variant: "ghost",
                                            })}
                                        >
                                            Sign in
                                        </Link>
                                    )}
                                    {!user && (
                                        <span
                                            className="bg-slate-200 h-6 w-px"
                                            aria-hidden="true"
                                        />
                                    )}
                                    {!user && (
                                        <Link
                                            href="/register"
                                            className={buttonVariants({
                                                variant: "ghost",
                                            })}
                                        >
                                            Register
                                        </Link>
                                    )}
                                    {user && (
                                        <span
                                            className="bg-slate-200 h-6 w-px"
                                            aria-hidden="true"
                                        />
                                    )}
                                    {!user && (
                                        <div className="flex lg:ml-6">
                                            <span
                                                className="bg-slate-200 h-6 w-px"
                                                aria-hidden="true"
                                            />
                                        </div>
                                    )}
                                    <div className="flow-root ml-4 lg:ml-6">
                                        <Cart />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </header>
        </nav>
    );
}
