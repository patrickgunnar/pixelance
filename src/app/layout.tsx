import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn, constructMetadata } from "@/lib/utils";
import Navbar from "@/components/navbar/Navbar";

import "./globals.css";
import Providers from "@/components/providers/Providers";
import { Toaster } from "sonner";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = constructMetadata();

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
                    <Providers>
                        <Navbar />
                        <div className="flex-grow flex-1">{children}</div>
                        <Footer />
                    </Providers>
                </main>
                <Toaster position="top-right" richColors />
            </body>
        </html>
    );
}
