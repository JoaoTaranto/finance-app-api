import {
    badRequest,
    checkIfIdIsValid,
    created,
    IsIdInvalidResponse,
    serverError,
} from "../helpers";
import validator from "validator";

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase;
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            const requiredFields = [
                "first_name",
                "last_name",
                "email",
                "password",
            ];

            // VALIDATIONS
            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({ message: `Missing param: ${field}` });
                }
            }

            const userIdIsValid = checkIfIdIsValid(params.user_id);

            if (!userIdIsValid) {
                IsIdInvalidResponse();
            }

            if (params.amount <= 0) {
                badRequest({
                    message: "The amount must be greater than 0.",
                });
            }

            const amountIsValid = validator.isCurrency(
                params.amount.toString(),
                {
                    digits_after_decimal: [2],
                    allow_negatives: false,
                    decimal_separator: ".",
                },
            );

            if (!amountIsValid) {
                badRequest({
                    message: "The amount must be a valid currency",
                });
            }

            const type = params.type.trim().toUpperCase();

            const typeIsValid = ["EARNING", "EXPENSE", "INVESTMENT"].includes(
                type,
            );

            if (!typeIsValid) {
                badRequest({
                    message: "The type must be EARNING, EXPENSE or INVESTMENT",
                });
            }

            const transaction = await this.createTransactionUseCase.execute({
                ...params,
                type,
            });
            return created(transaction);
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}
