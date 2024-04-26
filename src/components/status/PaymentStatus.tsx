"use client";

import { trpc } from "../../trpc/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PaymentStatusProps {
    orderEmail: string;
    orderId: string;
    isPaid: boolean;
}

export default function PaymentStatus({
    orderEmail,
    orderId,
    isPaid,
}: PaymentStatusProps) {
    const router = useRouter();
    const { data } = trpc.payment.pollOrderStatus.useQuery(
        {
            orderId,
        },
        {
            enabled: isPaid === false,
            refetchInterval: (data) => (data?.isPaid ? false : 1000),
        }
    );

    useEffect(() => {
        if (data?.isPaid) router.refresh();
    }, [data, router]);

    return (
        <div className="grid gap-x-4 grid-cols-2 text-sm text-green-600 mt-16">
            <div>
                <p className="font-medium text-green-900">Shipping To:</p>
                <p>{orderEmail}</p>
            </div>
            <div>
                <p className="font-medium text-green-900">Order Status:</p>
                <p>{isPaid ? "Payment successful" : "Pending payment"}</p>
            </div>
        </div>
    );
}
