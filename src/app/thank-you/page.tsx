import PaymentStatus from "@/components/status/PaymentStatus";
import { PRODUCT_CATEGORIES } from "@/config";
import { getServerSideUser } from "@/lib/payload-utils";
import { formatsPrice } from "@/lib/utilities";
import { getPayloadClient } from "@/server/getPayload";
import { Product, ProductFile, User } from "@/server/payload-types";
import { BadgeCheck } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

interface PageProps {
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

export default async function Page({ searchParams }: PageProps) {
    const orderId = searchParams.orderId;
    const payload = await getPayloadClient();
    const { user } = await getServerSideUser({
        cookies: cookies(),
    });
    const { docs: orders } = await payload.find({
        collection: "orders",
        depth: 2,
        where: {
            id: {
                equals: orderId,
            },
        },
    });
    const [order] = orders;

    if (!order) return notFound();

    const orderUserId =
        typeof order.user === "string" ? order.user : order.user.id;

    if (orderUserId !== user?.id)
        return redirect(`/sign-in?origin=thank-you?orderId=${order.id}`);

    const products = order.products as Product[];
    const productsTotal = products.reduce((t, { price }) => {
        return t + price;
    }, 0);
    const feeCost = 1;
    const total = feeCost + productsTotal;

    return (
        <main className="relative lg:min-h-full">
            <div className="overflow-hidden h-80 lg:absolute lg:pr-4 lg:h-full lg:w-1/2 xl:pr-12">
                <BadgeCheck className="text-green-800 h-full w-full" />
            </div>
            <div className="mx-auto px-4 py-16 max-w-2xl sm:px-6 sm:py-24 lg:grid lg:gap-x-8 lg:grid-cols-2 lg:px-8 lg:py-32 lg:max-w-7xl xl:gap-x-24">
                <div className="lg:col-start-2">
                    <p className="font-medium text-sm text-green-600">
                        Ordered Successfully
                    </p>
                    <h1 className="font-bold text-4xl text-green-900 tracking-tight mt-2 sm:text-5xl">
                        Thank you for your order
                    </h1>
                    {order._isPaid ? (
                        <p className="text-base text-muted-foreground mt-2">
                            Your order was processed and your assets are
                            available to be downloaded below. We&apos;ve sent
                            your receipt and order details to{" "}
                            {typeof order.user !== "string" && (
                                <span className="font-medium text-green-900">
                                    {order.user.email}
                                </span>
                            )}
                        </p>
                    ) : (
                        <p className="text-base text-muted-foreground mt-2">
                            Thank you for your order! Rest assured, we&apos;re
                            diligently processing it. Sit tight, and expect an
                            email from us shortly!
                        </p>
                    )}
                    <div className="font-medium text-sm mt-16">
                        <div className="text-muted-foreground">
                            Order number:{" "}
                        </div>
                        <div className="text-green-900 mt-2">{order.id}</div>
                        <ul className="font-medium text-sm text-muted-foreground mt-6 divide-y divide-green-200 border-t border-green-200">
                            {(order.products as Product[]).map((product) => {
                                const { id, name, category, images, price } =
                                    product;
                                const label = PRODUCT_CATEGORIES.find(
                                    ({ value }) => value === category
                                )?.label;
                                const downloadUrl = (
                                    product.product_files as ProductFile
                                ).url as string;
                                const { image } = images[0];

                                return (
                                    <li
                                        key={id}
                                        className="flex space-x-6 py-6"
                                    >
                                        <div className="relative h-24 w-24">
                                            {typeof image !== "string" &&
                                                image.url && (
                                                    <Image
                                                        src={image.url}
                                                        alt={name}
                                                        className="flex-none bg-green-100 rounded-md object-cover object-center"
                                                        fill
                                                    />
                                                )}
                                        </div>
                                        <div className="flex flex-auto flex-col justify-between">
                                            <div className="space-y-1">
                                                <h3 className="text-green-900">
                                                    {name}
                                                </h3>
                                                <p className="my-1">{label}</p>
                                            </div>
                                            {order._isPaid && (
                                                <a
                                                    href={downloadUrl}
                                                    download={name}
                                                    className="text-green-600 hover:underline underline-offset-2"
                                                >
                                                    Download asset
                                                </a>
                                            )}
                                        </div>
                                        <p className="flex-none font-medium text-green-900">
                                            {formatsPrice(price, {})}
                                        </p>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="font-medium text-sm text-muted-foreground border-t border-green-200 pt-6 space-y-6">
                            <div className="flex justify-between">
                                <p>Subtotal:</p>
                                <p className="text-green-900">
                                    {formatsPrice(productsTotal, {})}
                                </p>
                            </div>
                            <div className="flex justify-between">
                                <p>Transaction Fee:</p>
                                <p className="text-green-900">
                                    {formatsPrice(feeCost, {})}
                                </p>
                            </div>
                            <div className="flex items-center justify-between border-t border-green-200 text-green-900 pt-6">
                                <p className="text-base">Total:</p>
                                <p className="text-base">
                                    {formatsPrice(total, {})}
                                </p>
                            </div>
                        </div>
                        <PaymentStatus
                            orderEmail={(order.user as User).email}
                            orderId={order.id}
                            isPaid={order._isPaid}
                        />
                        <div className="text-right border-t border-green-200 mt-16 py-6">
                            <Link
                                href="/products"
                                className="font-medium text-sm text-green-600 hover:text-green-500"
                            >
                                Continue shopping &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
