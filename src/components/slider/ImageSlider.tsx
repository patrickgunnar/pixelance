"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type SwiperType from "swiper";
import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/pagination";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSliderProps {
    urls: string[];
}

export default function ImageSlider({ urls }: ImageSliderProps) {
    const [swiper, setSwiper] = useState<null | SwiperType>(null);
    const [activeIdx, setActiveIdx] = useState<number>(0);
    const [slideConfig, setSlideConfig] = useState<{
        isBeginning: boolean;
        isEnd: boolean;
    }>({
        isBeginning: true,
        isEnd: activeIdx === (urls.length ?? 0) - 1,
    });

    useEffect(() => {
        swiper?.on("slideChange", ({ activeIndex }) => {
            setActiveIdx(activeIndex);
            setSlideConfig({
                isBeginning: activeIndex === 0,
                isEnd: activeIndex === (urls.length ?? 0) - 1,
            });
        });
    }, [swiper, urls]);

    const inactiveStyles = "hidden text-gray-400";
    const activeStyles =
        "absolute bg-green-100 grid items-center justify-center border-2 border-green-300 rounded-full top-1/2 opacity-100 aspect-square -translate-y-1/2 h-8 w-8 z-50 active:scale-[0.97] hover:scale-105";

    return (
        <div className="group relative bg-green-100 rounded-lg aspect-square overflow-hidden">
            <div className="absolute transition opacity-0 inset-0 z-10 group-hover:opacity-100">
                <button
                    type="button"
                    title="Control right button"
                    aria-label="next image"
                    onClick={(e) => {
                        e.preventDefault();
                        swiper?.slideNext();
                    }}
                    className={cn(activeStyles, "transition right-3", {
                        [inactiveStyles]: slideConfig.isEnd,
                        "hover:bg-primary-300 text-primary-800 opacity-100":
                            !slideConfig.isEnd,
                    })}
                >
                    <ChevronRight className="text-green-700 h-4 w-4" />{" "}
                </button>
                <button
                    type="button"
                    title="Control left button"
                    aria-label="previous image"
                    onClick={(e) => {
                        e.preventDefault();
                        swiper?.slidePrev();
                    }}
                    className={cn(activeStyles, "transition left-3", {
                        [inactiveStyles]: slideConfig.isBeginning,
                        "hover:bg-primary-300 text-primary-800 opacity-100":
                            !slideConfig.isBeginning,
                    })}
                >
                    <ChevronLeft className="text-green-700 h-4 w-4" />{" "}
                </button>
            </div>
            <Swiper
                className="h-full w-full"
                onSwiper={(swiper) => setSwiper(swiper)}
                spaceBetween={50}
                slidesPerView={1}
                modules={[Pagination]}
                pagination={{
                    renderBullet: (_, className) => {
                        console.log(className);
                        return `<span class="${className} transition rounded-full"></span>`;
                    },
                }}
            >
                {urls.map((url, idx) => {
                    return (
                        <SwiperSlide
                            key={idx}
                            className="relative h-full w-full -z-10"
                        >
                            <Image
                                src={url}
                                alt="Product Image"
                                className="object-cover object-center h-full w-full z-10"
                                loading="eager"
                                fill
                            />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}
