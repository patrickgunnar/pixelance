"use client";

import { Icons } from "@/components/icons/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    AuthCredentialsValidator,
    TypeAuthCredentialsValidator,
} from "@/lib/validators/credentials";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { ZodError } from "zod";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TypeAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator),
    });

    const searchParams = useSearchParams();
    const router = useRouter();
    const isSeller = searchParams.get("as") === "seller";
    const origin = searchParams.get("origin");

    const continueAsSeller = () => {
        router.push("?as=seller");
    };

    const continueAsCostumer = () => {
        router.replace("/sign-in", undefined);
    };

    const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
        onSuccess: () => {
            toast.success("Signed in successfully!");
            router.refresh();

            if (origin) {
                router.push(`/${origin}`);
                return;
            }

            if (isSeller) {
                router.push("/sell");
                return;
            }

            return router.push("/");
        },
        onError: (err) => {
            if (err.data?.code === "UNAUTHORIZED") {
                toast.error("Invalid e-mail or password.");
            }
        },
    });

    const onSubmit = ({ email, password }: TypeAuthCredentialsValidator) => {
        // send the data to the server
        signIn({ email, password });
    };

    return (
        <>
            <div className="container relative flex flex-col items-center justify-center pt-20 lg:px-0">
                <div className="flex flex-col justify-center space-y-6 mx-auto w-full sm:w-[350px]">
                    <div className="flex flex-col items-center text-center space-y-2">
                        <Icons.logo className="h-20 w-20 text-green-800" />
                        <h1 className="font-bold text-2xl">
                            Login into your {isSeller ? "seller" : ""} account
                        </h1>
                        <Link
                            href="/sign-up"
                            className={buttonVariants({
                                variant: "link",
                                className: "gap-1.5",
                            })}
                        >
                            Does not have an account? Sign-up
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="grid gap-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-2">
                                <div className="grid gap-1 py-2">
                                    <Label htmlFor="email">E-mail:</Label>
                                    <Input
                                        className={cn({
                                            "focus-visible:ring-red-500":
                                                errors.email,
                                        })}
                                        placeholder="email@exemple.com"
                                        {...register("email")}
                                    />
                                    {errors?.email && (
                                        <p className="text-sm text-red-500">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-1 py-2">
                                    <Label htmlFor="password">Password:</Label>
                                    <Input
                                        className={cn({
                                            "focus-visible:ring-red-500":
                                                errors.password,
                                        })}
                                        placeholder="Password"
                                        type="password"
                                        {...register("password")}
                                    />
                                    {errors?.password && (
                                        <p className="text-sm text-red-500">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>
                                <Button>Sign in</Button>
                            </div>
                        </form>
                        <div className="relative">
                            <div
                                aria-hidden="true"
                                className="absolute flex items-center inset-0"
                            >
                                <span className="border-t w-full" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background text-muted-foreground px-2">
                                    or
                                </span>
                            </div>
                        </div>
                        {isSeller ? (
                            <Button
                                onClick={continueAsCostumer}
                                variant="secondary"
                                disabled={isLoading}
                            >
                                Continue as costumer
                            </Button>
                        ) : (
                            <Button
                                onClick={continueAsSeller}
                                variant="secondary"
                                disabled={isLoading}
                            >
                                Continue as seller
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
