import AddToCartButton from "@/components/buttons/AddToCartButton";
import ProductReel from "@/components/reels/ProductReel";
import ImageSlider from "@/components/slider/ImageSlider";
import MaxWidthWrapper from "@/components/widthWrapper/MaxWidthWrapper";
import { PRODUCT_CATEGORIES } from "@/config";
import { formatsPrice } from "@/lib/utilities";
import { getPayloadClient } from "@/server/getPayload";
import { Check, Shield } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: {
        id: string;
    };
}

const BREADCRUMBS: {
    id: number;
    name: string;
    href: string;
}[] = [
    {
        id: 1,
        name: "Home",
        href: "/",
    },
    {
        id: 2,
        name: "Products",
        href: "/products",
    },
];

export default async function Page({ params: { id } }: PageProps) {
    const payload = await getPayloadClient();
    const { docs: products } = await payload.find({
        collection: "products",
        limit: 1,
        where: {
            id: {
                equals: id,
            },
            approvedForSale: {
                equals: "approved",
            },
        },
    });

    const [product] = products;

    if (!product) return notFound();

    const { name, price, category, description, images } = product;

    const label = PRODUCT_CATEGORIES.find(
        ({ value }) => value === category
    )?.label;

    const validUrls = images
        .map(({ image }) => (typeof image === "string" ? image : image.url))
        .filter(Boolean) as string[];

    return (
        <MaxWidthWrapper className="bg-white">
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:gap-x-8 lg:grid-cols-2 lg:px-8 lg:max-w-7xl">
                    {/* Product Details */}
                    <div className="lg:self-end lg:max-w-lg">
                        <ol className="flex items-center space-x-2">
                            {BREADCRUMBS.map((breadcrumb, idx) => {
                                return (
                                    <li key={breadcrumb.href}>
                                        <div className="flex items-center text-sm">
                                            <Link
                                                href={breadcrumb.href}
                                                className="font-medium text-sm text-muted-foreground hover:text-green-900"
                                            >
                                                {breadcrumb.name}
                                            </Link>
                                            {idx !== BREADCRUMBS.length - 1 && (
                                                <svg
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                    className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                                                >
                                                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                                </svg>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ol>
                        <div className="mt-4">
                            <h1 className="font-bold text-3xl text-gray-900 tracking-tight sm:text-4xl">
                                {name}
                            </h1>
                        </div>
                        <section className="mt-4">
                            <div className="flex items-center">
                                <p className="font-medium text-gray-900">
                                    {formatsPrice(price, {})}
                                </p>
                                <div className="text-muted-foreground border-1 border-green-300 pl-4 ml-4">
                                    {label}
                                </div>
                            </div>
                            <div className="mt-4 space-y-6">
                                <p className="text-base text-muted-foreground">
                                    {description}
                                </p>
                            </div>
                            <div className="flex items-center mt-6">
                                <Check
                                    aria-hidden="true"
                                    className="flex-shrink-0 text-green-500"
                                />
                                <p className="text-sm text-muted-foreground ml-2">
                                    Eligible for instant delivery
                                </p>
                            </div>
                        </section>
                    </div>
                    {/* Product Images */}
                    <div className="mt-10 lg:col-start-2 lg:row-start-2 lg:self-center lg:mt-0">
                        <div className="aspect-square rounded-lg">
                            <ImageSlider urls={validUrls} />
                        </div>
                    </div>
                    {/* Add to Cart */}
                    <div className="mt-10 lg:col-start-1 lg:row-start-2 lg>self-start lg:max-w-lg">
                        <div>
                            <div className="mt-10">
                                <AddToCartButton />
                            </div>
                            <div className="text-center mt-6">
                                <div className="group inline-flex text-sm text-medium">
                                    <Shield
                                        aria-hidden="true"
                                        className="text-green-400 flex-shrink-0 mr-2 h-5 w-5"
                                    />
                                    <span className="text-muted-foreground hover:text-green-700">
                                        30 Day Return Guarantee
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProductReel
                href="/products"
                query={{ category: category as string | undefined, limit: 4 }}
                title={`Similar ${label}`}
                subtitle={`Browse similar High-Quality ${label} just like "${name}"`}
            />
        </MaxWidthWrapper>
    );
}
