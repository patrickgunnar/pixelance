import VerifyEmailComponent from "@/components/verify/VerifyEmailComponent";
import { MailCheck } from "lucide-react";

interface PageProps {
    searchParams: {
        [key: string]: string | string[] | undefined;
    };
}

export default function VerifyEmail({ searchParams }: PageProps) {
    const token = searchParams.token;
    const toEmail = searchParams.to;

    return (
        <div className="container relative flex flex-col items-center justify-center pt-20 lg:px-0">
            <div className="flex flex-col justify-center space-y-6 mx-auto w-full sm:w-[350px]">
                {token && typeof token === "string" ? (
                    <div className="grid gap-6">
                        <VerifyEmailComponent token={token} />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center space-y-1 h-full">
                        <div className="relative text-muted-foreground mb-4 h-60 w-60">
                            <MailCheck className="text-green-800 h-60 w-60" />
                        </div>
                        <h3 className="font-semibold text-2xl">
                            Check your e-mail
                        </h3>
                        {toEmail ? (
                            <p className="text-muted-foreground text-center">
                                We&apos;ve sent a verification link to{" "}
                                <span className="font-semibold">{toEmail}</span>
                                .
                            </p>
                        ) : (
                            <p className="text-muted-foreground text-center">
                                We&apos;ve sent a verification link to your
                                e-mail.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
