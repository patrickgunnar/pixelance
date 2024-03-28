"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { useRef, useState } from "react";
import NavItem from "./NavItem";

export default function NavItems() {
    const navRef = useRef<HTMLDivElement | null>(null);

    const [activeIdx, setActiveIdx] = useState<null | number>(null);

    const isAnyOpen = activeIdx !== null;

    return (
        <div className="flex gap-4 h-full">
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
