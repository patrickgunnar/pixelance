"use client";

import { Product } from "@/server/payload-types";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PRODUCT_CATEGORIES } from "@/config";
import { formatsPrice } from "@/lib/utilities";

function ProductPlaceholder() {
    return (
        <div className="flex flex-col w-full">
            <div className="relative bg-zinc-100 rounded-xl aspect-square overflow-hidden w-full">
                <Skeleton className="h-full w-full" />
            </div>
            <Skeleton className="rounded-lg mt-4 h-4 w-2/3" />
            <Skeleton className="rounded-lg mt-2 h-4 w-16" />
            <Skeleton className="rounded-lg mt-2 h-4 w-12" />
        </div>
    );
}

interface ProductListingProps {
    product: Product | null;
    index: number;
}

export default function ProductListing({
    product,
    index,
}: ProductListingProps) {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, index * 75);

        return () => {
            clearTimeout(timer);
        };
    }, [index]);

    if (!product || !isVisible) return <ProductPlaceholder />;

    const label = PRODUCT_CATEGORIES.find(
        ({ value }) => value === product.category
    )?.label;

    if (product && isVisible)
        return (
            <Link
                href={`/products/${product.id}`}
                className={cn(
                    "invisible cursor-pointer group/main h-full w-full",
                    {
                        "visible animate-in fade-in-5": isVisible,
                    }
                )}
            >
                <div className="flex flex-col w-full">
                    <h3 className="font-medium text-sm text-gray-700 mt-4">
                        {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{label}</p>
                    <p className="font-medium text-sm text-gray-900 mt-1">
                        {formatsPrice(product.price, {})}
                    </p>
                </div>
            </Link>
        );

    return <div></div>;
}
