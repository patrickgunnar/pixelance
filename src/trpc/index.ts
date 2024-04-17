import { authRouter } from "./authRouter";
import { publicProcedure, router } from "./trpc";

export const appRouter = router({
    auth: authRouter,
});

export type AppRouter = typeof appRouter;
