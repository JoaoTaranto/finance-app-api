import {
    checkIfIdIsValid,
    checkIfAmountIsValid,
    invalidAmountResponse,
    IsIdInvalidResponse,
    badRequest,
    serverError,
    checkIfTypeIsValid,
    invalidTypeResponse,
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

            const allowedFields = ["name", "date", "amount", "type"];

            const someFieldIsNotValid = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            );
            if (someFieldIsNotValid) {
                return badRequest({
                    message: "Some provided field is not allowed",
                });
            }

            if (params.amount) {
                const amountIsValid = checkIfAmountIsValid(params.amount);
                if (!amountIsValid) return invalidAmountResponse();
            }

            if (params.type) {
                const typeIsValid = checkIfTypeIsValid(params.type);
                if (!typeIsValid) return invalidTypeResponse();
            }

            const updatedTransaction =
                await this.updateTransactionUseCase.execute(
                    httpRequest.params.transactionId,
                    params,
                );

            if (!updatedTransaction[0]) return transactionNotFoundResponse();
            return ok(updatedTransaction);
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}
