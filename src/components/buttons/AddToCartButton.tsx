"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface AddToCartButtonProps {}

export default function AddToCartButton({}: AddToCartButtonProps) {
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
                setIsSuccess(true);
            }}
        >
            {isSuccess ? "Added!" : "Add to cart"}
        </Button>
    );
}
