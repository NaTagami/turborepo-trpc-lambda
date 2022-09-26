import { z } from "zod";

type Tagged<T, Tag> = T & { __tag: Tag };
export type UserName = Tagged<string, "UserName">;

export const UserName: z.Schema<UserName> = z.string() as any;
