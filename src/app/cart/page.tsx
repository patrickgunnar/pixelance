"use client";

import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES } from "@/config";
import { useCart } from "@/hooks/useCart";
import { formatsPrice } from "@/lib/utilities";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { Check, Loader2, ShoppingBasket, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const router = useRouter();

    const { items, removeItem } = useCart();
    const { mutate: createCheckoutSession, isLoading } =
        trpc.payment.createSession.useMutation({
            onSuccess: ({ url }) => {
                if (url) router.push(url);
            },
        });

    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const cartTotal = items.reduce((t, { product }) => t + product.price, 0);
    const feeCost = 1;
    const total = cartTotal + feeCost;
    const productIds = items.map(({ product }) => product.id);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="font-bold text-3xl text-green-900 tracking-tight sm:text-4xl">
                    Shopping Cart
                </h1>
                <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
                    <div
                        className={cn("lg:col-span-7", {
                            "rounded-lg border-2 border-dashed border-green-200 p-12":
                                isMounted && items.length === 0,
                        })}
                    >
                        <h2 className="sr-only">Items in your shopping cart</h2>
                        {isMounted && items.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full space-y-1">
                                <div
                                    aria-hidden="true"
                                    className="relative text-muted-foreground mb-4 h-40 w-40"
                                >
                                    <ShoppingBasket className="text-green-200 h-36 w-36" />
                                </div>
                                <h3 className="font-semibold text-2xl">
                                    Your cart is empty
                                </h3>
                                <p className="text-muted-foreground text-center">
                                    Nothing to be showed in here yet.
                                </p>
                            </div>
                        )}
                        <ul
                            className={cn({
                                "divide-y divide-green-200 border-b border-t border-green-200":
                                    items.length > 0,
                            })}
                        >
                            {items.map(
                                ({
                                    product: {
                                        id,
                                        category,
                                        images,
                                        name,
                                        price,
                                    },
                                }) => {
                                    const { image } = images[0];
                                    const label = PRODUCT_CATEGORIES.find(
                                        (c) => c.value === category
                                    )?.label;

                                    return (
                                        <li
                                            key={id}
                                            className="flex py-6 sm:py-10"
                                        >
                                            <div className="flex-shrink-0">
                                                <div className="relative h-24 w-24">
                                                    {typeof image !==
                                                        "string" &&
                                                        image.url && (
                                                            <Image
                                                                src={image.url}
                                                                alt={name}
                                                                className="rounded-md object-cover object-center h-full w-full sm:h-48 sm:w-48"
                                                                fill
                                                            />
                                                        )}
                                                </div>
                                            </div>
                                            <div className="flex flex-1 flex-col justify-between ml-4 sm:ml-6">
                                                <div className="relative pr-9 sm:grid sm:gap-x-6 sm:grid-cols-2 sm:pr-0">
                                                    <div>
                                                        <div className="flex justify-between">
                                                            <h3 className="text-sm">
                                                                <Link
                                                                    href={`/product/${id}`}
                                                                    className="font-medium text-green-700 hover:text-green-800"
                                                                >
                                                                    {name}
                                                                </Link>
                                                            </h3>
                                                        </div>
                                                        <div className="flex text-sm mt-1">
                                                            <p className="text-muted-foreground">
                                                                Category:{" "}
                                                                {label}
                                                            </p>
                                                        </div>
                                                        <p className="font-medium text-sm text-green-900 mt-1">
                                                            {formatsPrice(
                                                                price,
                                                                {}
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="mt-4 sm:mt-0 sm:pr-9 w-20">
                                                        <div className="absolute right-0 top-0">
                                                            <Button
                                                                aria-label="Remove Product"
                                                                variant="ghost"
                                                                onClick={() =>
                                                                    removeItem(
                                                                        id
                                                                    )
                                                                }
                                                            >
                                                                <X
                                                                    aria-hidden="true"
                                                                    className="h-5 w-5"
                                                                />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="flex text-sm text-green-700 mt-4 space-x-2">
                                                    <Check className="flex-shrink-0 text-green-500 h-5 w-5" />
                                                    <span>
                                                        Eligible for instant
                                                        delivery
                                                    </span>
                                                </p>
                                            </div>
                                        </li>
                                    );
                                }
                            )}
                        </ul>
                    </div>
                    <section className="rounded-lg bg-green-50 mt-16 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
                        <h2 className="font-medium text-lg text-gray-900">
                            Order Summary
                        </h2>
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600">
                                    Subtotal
                                </p>
                                <p className="font-medium text-sm text-gray-900">
                                    {isMounted ? (
                                        formatsPrice(cartTotal, {})
                                    ) : (
                                        <Loader2 className="animate-spin text-muted-foreground h-4 w-4" />
                                    )}
                                </p>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <span>Flat Transaction Fee</span>
                                </div>
                                <div className="font-medium text-sm text-gray-900">
                                    {isMounted ? (
                                        formatsPrice(feeCost, {})
                                    ) : (
                                        <Loader2 className="animate-spin text-muted-foreground h-4 w-4" />
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <div className="font-medium text-base text-gray-900">
                                    Order Total
                                </div>
                                <div className="font-medium text-base text-gray-900">
                                    {isMounted ? (
                                        formatsPrice(total, {})
                                    ) : (
                                        <Loader2 className="animate-spin text-muted-foreground h-4 w-4" />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <Button
                                className="w-full"
                                size="lg"
                                disabled={items.length === 0 || isLoading}
                                onClick={() =>
                                    createCheckoutSession({ productIds })
                                }
                            >
                                {isLoading && (
                                    <Loader2 className="animate-spin mr-1.5 h-4 w-4" />
                                )}
                                Checkout
                            </Button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
