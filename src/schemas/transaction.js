import { z } from "zod";

export const CreateTransactionSchema = z.strictObject(
    {
        user_id: z.uuid("User ID must be a valid UUID"),
        name: z.string("Name is required!").trim().min(1, {
            error: "Name is required!",
        }),
        date: z.iso.datetime("Invalid date!"),
        type: z.enum(["EXPENSE", "EARNING", "INVESTMENT"], {
            error: "Type must be EXPENSE, EARNING or INVESTMENT",
        }),
        amount: z.number("Amount is required!").min(1, {
            error: "Amount must be greater than 0",
        }),
    },
    { error: "Some provided field is not allowed" },
);

export const UpdateTransactionSchema = CreateTransactionSchema.omit({
    user_id: true,
}).partial();
