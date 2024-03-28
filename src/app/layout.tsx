import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar/Navbar";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Pixelance",
    description: "Your Marketplace for Exceptional Assets",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full">
            <body
                className={cn(inter.className, "relative antialiased h-full")}
            >
                <main className="relative flex flex-col min-h-screen">
                    <Navbar />
                    <div className="flex-grow flex-1">{children}</div>
                </main>
            </body>
        </html>
    );
}
