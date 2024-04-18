import { User } from "@/server/payload-types";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { NextRequest } from "next/server";

interface ServerSideUserProps {
    cookies: NextRequest["cookies"] | ReadonlyRequestCookies;
}

export async function getServerSideUser({
    cookies,
}: ServerSideUserProps) {
    const token = cookies.get("payload-token")?.value;
    const meRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
        {
            headers: {
                Authorization: `JWT ${token}`,
            },
        }
    );

    const { user } = (await meRes.json()) as { user: User | null };

    return { user };
}
