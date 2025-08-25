import { ZodError } from "zod";
import { CreateTransactionSchema } from "../../schemas/index.js";
import { badRequest, created, serverError } from "../helpers/index.js";

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase;
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            await CreateTransactionSchema.parseAsync(params);

            const transaction =
                await this.createTransactionUseCase.execute(params);
            return created(transaction);
        } catch (error) {
            console.error(error);
            if (error instanceof ZodError)
                return badRequest({
                    message: error.issues[0].message,
                });

            return serverError();
        }
    }
}
