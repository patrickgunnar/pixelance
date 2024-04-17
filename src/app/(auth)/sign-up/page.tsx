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

export default function Page() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TypeAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator),
    });

    const { mutate } = trpc.auth.createPayloadUser.useMutation({});

    const onSubmit = ({ email, password }: TypeAuthCredentialsValidator) => {
        // send the data to the server
        mutate({ email, password });
    };

    return (
        <>
            <div className="container relative flex flex-col items-center justify-center pt-20 lg:px-0">
                <div className="flex flex-col justify-center space-y-6 mx-auto w-full sm:w-[350px]">
                    <div className="flex flex-col items-center text-center space-y-2">
                        <Icons.logo className="h-20 w-20 text-green-800" />
                        <h1 className="font-bold text-2xl">
                            Create an account
                        </h1>
                        <Link
                            href="/sign-in"
                            className={buttonVariants({
                                variant: "link",
                                className: "gap-1.5",
                            })}
                        >
                            Already have an account? Sign-in
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
                                </div>
                                <Button>Sign up</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
