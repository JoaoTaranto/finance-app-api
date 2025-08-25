import { z } from "zod";

export const createUserSchema = z.object({
    first_name: z.string("First name is required!").trim().min(1, {
        error: "First name is required!",
    }),
    last_name: z.string("Last name is required!").trim().min(1, {
        error: "Last name is required!",
    }),
    email: z.email("Please provide a valid e-mail", {
        pattern: z.regexes.email,
    }),
    password: z
        .string("Password is required!")
        .trim()
        .min(6, { error: "Password must have at least 6 characters!" }),
});
