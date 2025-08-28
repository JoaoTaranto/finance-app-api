import { ZodError } from "zod";
import { UpdateTransactionSchema } from "../../schemas/transaction.js";
import {
    checkIfIdIsValid,
    IsIdInvalidResponse,
    badRequest,
    serverError,
    ok,
    transactionNotFoundResponse,
} from "../helpers/index.js";

export class UpdateTransactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase;
    }
    async execute(httpRequest) {
        try {
            const isIdValid = checkIfIdIsValid(
                httpRequest.params.transactionId,
            );
            if (!isIdValid) return IsIdInvalidResponse();

            const params = httpRequest.body;

            await UpdateTransactionSchema.parseAsync(params);

            const updatedTransaction =
                await this.updateTransactionUseCase.execute(
                    httpRequest.params.transactionId,
                    params,
                );

            if (!updatedTransaction) return transactionNotFoundResponse();
            return ok(updatedTransaction);
        } catch (error) {
            if (error instanceof ZodError)
                return badRequest({
                    message: error.issues[0].message,
                });
            console.error(error);
            return serverError();
        }
    }
}
