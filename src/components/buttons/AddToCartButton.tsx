"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/server/payload-types";

interface AddToCartButtonProps {
    product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addItem } = useCart();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsSuccess(false);
        }, 2000);

        return () => {
            clearTimeout(timeout);
        };
    }, [isSuccess]);

    return (
        <Button
            size="lg"
            className="w-full"
            onClick={() => {
                addItem(product);
                setIsSuccess(true);
            }}
        >
            {isSuccess ? "Added!" : "Add to cart"}
        </Button>
    );
}
