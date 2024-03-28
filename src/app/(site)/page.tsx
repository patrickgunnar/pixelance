import GreenSpan from "@/components/span/GreenSpan";
import { Button, buttonVariants } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/widthWrapper/MaxWidthWrapper";
import { ArrowDownToLineIcon, CheckCircle, PawPrint } from "lucide-react";
import Link from "next/link";

const perks = [
    {
        id: "perkID",
        name: "Instant Delivery",
        Icon: ArrowDownToLineIcon,
        description: "Get the picks instantly to your e-mail.",
    },
    {
        id: "perkPQ",
        name: "Priceless Quality",
        Icon: CheckCircle,
        description: "Every asset in Pixelance is verified to ensure quality.",
    },
    {
        id: "perkCCF",
        name: "Canine Compassion Fund",
        Icon: PawPrint,
        description: "1% of sales support Dog Care Initiative.",
    },
];

export default function Home() {
    return (
        <>
            <MaxWidthWrapper>
                <div className="flex flex-col items-center text-center py-20 mx-auto max-w-3xl">
                    <h1 className="tracking-tight font-bold text-4xl sm:text-6xl text-slate-900">
                        Your Marketplace for{" "}
                        <span className="text-green-600">
                            Exceptional Assets
                        </span>
                        .
                    </h1>
                    <p className="mt-6 text-muted-foreground text-lg max-w-prose">
                        Step Into{" "}
                        <span className="font-semibold">Pixelance</span>. Your
                        Gateway to Digital Assets:{" "}
                        <GreenSpan>Explore</GreenSpan>,{" "}
                        <GreenSpan>Discover</GreenSpan> and{" "}
                        <GreenSpan>Create with Us</GreenSpan>.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                        <Link href="/products" className={buttonVariants()}>
                            The Hot Picks
                        </Link>
                        <Button variant="ghost">Browse The Tops &rarr;</Button>
                    </div>
                </div>
                {/* TO-DO: List of Products */}
            </MaxWidthWrapper>
            <section className="bg-slate-50 border-t border-slate-200">
                <MaxWidthWrapper className="py-20">
                    <div className="grid gap-y-12 grid-cols-1 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
                        {perks.map((perk) => {
                            const { id, name, description, Icon } = perk;

                            return (
                                <div
                                    key={id}
                                    className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                                >
                                    <div className="flex justify-center md:flex-shrink-0">
                                        <div className="flex items-center justify-center rounded-full bg-green-100 text-green-900 h-16 w-16">
                                            <Icon className="h-1/3 w-1/3" />
                                        </div>
                                    </div>
                                    <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                                        <h3 className="font-medium text-base text-slate-900">
                                            {name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-3">
                                            {description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </MaxWidthWrapper>
            </section>
        </>
    );
}
