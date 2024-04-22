"use client";

import { Product } from "@/server/payload-types";
import { TypeQueryValidator } from "../../lib/validators/queryValidator";
import { trpc } from "../../trpc/client";
import Link from "next/link";
import ProductListing from "../listings/ProductListing";

interface ProductReelProps {
    title: string;
    subtitle?: string;
    href?: string;
    query: TypeQueryValidator;
}

const FALLBACK_LIMIT = 4;

export default function ProductReel({
    title,
    subtitle,
    href,
    query,
}: ProductReelProps) {
    const { data: queryResults, isLoading } =
        trpc.getInfiniteProducts.useInfiniteQuery(
            {
                limit: query.limit ?? FALLBACK_LIMIT,
                query,
            },
            {
                getNextPageParam: (lastPage) => lastPage.nextPage,
            }
        );

    const products = queryResults?.pages.flatMap((page) => page.items);
    let map: (Product | null)[] = [];

    if (products && products.length) {
        map = products;
    } else if (isLoading) {
        map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
    }

    return (
        <section className="py-12">
            <div className="md:flex md:items-center md:justify-between mb-4">
                <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
                    {title && (
                        <h1 className="font-bold text-2xl text-gray-900 sm:text-3xl">
                            {title}
                        </h1>
                    )}
                    {subtitle && (
                        <p className="text-sm text-muted-foreground mt-2">
                            {subtitle}
                        </p>
                    )}
                </div>
                {href && (
                    <Link
                        href={href}
                        className="hidde font-medium text-sm text-blue-600 hover:text-blue-500 md:block"
                    >
                        Shop the collection{" "}
                        <span aria-hidden="true">&rarr;</span>
                    </Link>
                )}
            </div>
            <div className="relative">
                <div className="flex items-center mt-6 w-full">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-10 w-full sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
                        {map.map((product, idx) => (
                            <ProductListing
                                key={idx}
                                product={product}
                                index={idx}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
