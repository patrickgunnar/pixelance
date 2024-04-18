"use client";

import { trpc } from "@/trpc/client";
import { Loader, MailCheck, XCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

interface VerifyEmailComponentProps {
    token: string;
}

export default function VerifyEmailComponent({
    token,
}: VerifyEmailComponentProps) {
    const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
        token,
    });

    if (isLoading)
        return (
            <div className="flex gap-2 flex-col items-center">
                <Loader className="animate-spin text-green-600 h-8 w-8" />
                <h3 className="font-semibold text-xl">Verifying...</h3>
                <p className="text-muted-foreground text-sm">
                    This won&apos;t take a long.
                </p>
            </div>
        );
    else if (isError)
        return (
            <div className="flex gap-2 flex-col items-center">
                <XCircle className="text-red-600 h-8 w-8" />
                <h3 className="font-semibold text-xl">There was a problem</h3>
                <p className="text-muted-foreground text-sm">
                    This token is not valid or might be expired. Please, try
                    again!
                </p>
            </div>
        );
    else if (data?.success)
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <div className="relative text-muted-foreground mb-4 h-60 w-60">
                    <MailCheck className="text-green-800 h-60 w-60" />
                </div>
                <h3 className="font-semibold text-2xl">You&apos;re all set!</h3>
                <p className="text-muted-foreground text-center mt-1">
                    Thank you for verifying your e-mail.
                </p>
                <Link
                    href="/sign-in"
                    className={buttonVariants({
                        className: "mt-4",
                    })}
                >
                    Sign in
                </Link>
            </div>
        );

    return <div></div>;
}
