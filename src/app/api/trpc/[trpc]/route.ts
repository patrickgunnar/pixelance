import { appRouter } from "@/trpc";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

function handler(req: Request) {
    fetchRequestHandler({
        endpoint: "/api/trpc",
        router: appRouter,
        createContext: () => ({}),
        req,
    });
}

export { handler as GET, handler as POST };
