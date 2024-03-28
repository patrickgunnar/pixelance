import Link from "next/link";
import MaxWidthWrapper from "../widthWrapper/MaxWidthWrapper";
import { Icons } from "../icons/Icons";
import NavItems from "./NavItems";

export default function Navbar() {
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
                        </div>
                    </div>
                </MaxWidthWrapper>
            </header>
        </nav>
    );
}
