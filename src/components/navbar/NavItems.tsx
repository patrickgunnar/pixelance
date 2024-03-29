"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useOnClick } from "@/hooks/useOnClick";

export default function NavItems() {
    const navRef = useRef<HTMLDivElement | null>(null);
    const [activeIdx, setActiveIdx] = useState<null | number>(null);
    const isAnyOpen = activeIdx !== null;

    const handleClose = () => {
        setActiveIdx(null);
    };

    useOnClick({
        ref: navRef,
        handler: handleClose,
    });

    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            // closes the element on key "Escape" press.
            if (event.key === "Escape") {
                handleClose();
            }
        };

        document.addEventListener("keydown", handler);

        return () => {
            document.removeEventListener("keydown", handler);
        };
    }, []);

    return (
        <div className="flex gap-4 h-full" ref={navRef}>
            {PRODUCT_CATEGORIES.map((category, idx) => {
                const handleOpen = () => {
                    if (activeIdx === idx) {
                        setActiveIdx(null);
                    } else {
                        setActiveIdx(idx);
                    }
                };

                const isOpen = idx === activeIdx;

                return (
                    <NavItem
                        key={category.value}
                        category={category}
                        handleOpen={handleOpen}
                        isOpen={isOpen}
                        isAnyOpen={isAnyOpen}
                    />
                );
            })}
        </div>
    );
}
