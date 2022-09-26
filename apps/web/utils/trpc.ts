import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "hello";

export const trpc = createReactQueryHooks<AppRouter>();
