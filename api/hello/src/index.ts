import * as trpc from "@trpc/server";
import { awsLambdaRequestHandler } from "@trpc/server/adapters/aws-lambda";
import type { CreateAWSLambdaContextOptions } from "@trpc/server/adapters/aws-lambda";
import type { APIGatewayProxyEvent } from "aws-lambda";
import { z, ZodError } from "zod";
import { UserName } from "common";

function createContext({
  event,
  context,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEvent>) {
  return {
    event: event,
    apiVersion: (event as { version?: string }).version || "1.0",
    user: event.headers["x-user"],
  };
}

//type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const appRouter = trpc
  .router()
  .query("hello", {
    input: z.object({
      name: UserName,
      message: z.string(),
    }),
    async resolve(req) {
      return { message: `Hello ${req.input.name}` };
    },
  })
  .formatError(({ shape, error }) => {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === "BAD_REQUEST" && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  });

export type AppRouter = typeof appRouter;

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext,
  responseMeta() {
    return {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
      },
    };
  },
});
