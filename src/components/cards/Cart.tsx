"use client";

import { ShoppingCartIcon } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import { formatsPrice } from "@/lib/utilities";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export default function Cart() {
    const itemCount = 0;
    const feeCost = 1;
    const total = feeCost + 10;

    return (
        <Sheet>
            <SheetTrigger className="group flex items-center p-2 -m-2">
                <ShoppingCartIcon
                    className="flex-shrink-0 text-green-400 h-6 w-6 group-hover:text-green-500"
                    aria-hidden="true"
                />
                <span className="font-medium text-sm text-slate-700 group-hover:text-slate-800 ml-2">
                    0
                </span>
            </SheetTrigger>
            <SheetContent className="flex flex-col pr-0 w-full sm:max-w-lg">
                <SheetHeader className="space-y-2.5 pr-6">
                    <SheetTitle>Cart (0)</SheetTitle>
                </SheetHeader>
                {itemCount > 0 ? (
                    <>
                        <div className="flex flex-col pr-6 w-full">
                            {/* TO-DO: Cart Logic */}
                            cart items
                        </div>
                        <div className="space-y-4 pr-6">
                            <Separator />
                            <div className="space-y-1.5 text-sm">
                                <div className="flex">
                                    <span className="flex-1">Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="flex">
                                    <span className="flex-1">
                                        Transaction Fee
                                    </span>
                                    <span>{formatsPrice(feeCost, {})}</span>
                                </div>
                                <div className="flex">
                                    <span className="flex-1">Total</span>
                                    <span>{formatsPrice(total, {})}</span>
                                </div>
                            </div>
                            <SheetFooter>
                                <SheetTrigger asChild>
                                    <Link
                                        href="/cart"
                                        className={buttonVariants({
                                            className: "w-full",
                                        })}
                                    >
                                        Continue to Checkout
                                    </Link>
                                </SheetTrigger>
                            </SheetFooter>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center space-y-1 h-full">
                        <div
                            className="relative flex items-center justify-center text-muted-foreground mb-4 h-60 w-60"
                            aria-hidden="true"
                        >
                            <ShoppingCartIcon className="text-green-800 h-40 w-40" />
                        </div>
                        <div className="font-semibold text-xl text-slate-400">
                            Your cart is empty
                        </div>
                        <SheetTrigger asChild>
                            <Link
                                href="/products"
                                className={buttonVariants({
                                    variant: "link",
                                    size: "sm",
                                    className: "text-sm text-muted-foreground",
                                })}
                            >
                                Add items to your cart to checkout
                            </Link>
                        </SheetTrigger>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
