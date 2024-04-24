import { PRODUCT_CATEGORIES } from "@/config";
import { useCart } from "@/hooks/useCart";
import { formatsPrice } from "@/lib/utilities";
import { Product } from "@/server/payload-types";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
    product: Product;
}

export default function CartItem({ product }: CartItemProps) {
    const { removeItem } = useCart();

    const { id, images, name, category, price } = product;
    const { image } = images[0];

    const label = PRODUCT_CATEGORIES.find(
        ({ value }) => value === category
    )?.label;

    return (
        <div className="py-2 space-y-3">
            <div className="flex gap-4 items-start justify-between">
                <div className="flex items-center space-x-4">
                    <div className="relative aspect-square rounded h-16 w-16 min-w-fit overflow-hidden">
                        {typeof image !== "string" && image.url ? (
                            <Image
                                src={image.url}
                                alt={name}
                                className="absolute object-cover"
                                fill
                            />
                        ) : (
                            <div className="flex items-center justify-center bg-secondary h-full">
                                <ImageIcon
                                    aria-hidden="true"
                                    className="text-muted-foreground h-4 w-4"
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col self-start">
                        <span className="font-medium text-sm line-clamp-1 mb-1">
                            {name}
                        </span>
                        <span className="text-xs text-muted-foreground capitalize line-clamp-1">
                            {label}
                        </span>
                        <div className="text-xs text-muted-foreground mt-4">
                            <button
                                type="button"
                                title="Remove Button"
                                className="flex gap-0.5 items-center"
                                onClick={() => removeItem(id)}
                            >
                                <X className="h-4 w-3" />
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col font-medium space-y-1">
                    <span className="text-sm line-clamp-1 ml-auto">
                        {formatsPrice(price, {})}
                    </span>
                </div>
            </div>
        </div>
    );
}
