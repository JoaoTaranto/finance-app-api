import {
    badRequest,
    checkIfIdIsValid,
    created,
    IsIdInvalidResponse,
    serverError,
    validateRequiredFields,
    requiredFieldIsMissingResponse,
    checkIfAmountIsValid,
    invalidAmountResponse,
    checkIfTypeIsValid,
    invalidTypeResponse,
} from "../helpers/index.js";
import validator from "validator";

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase;
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            const requiredFields = [
                "user_id",
                "name",
                "date",
                "amount",
                "type",
            ];

            // VALIDATIONS
            const { ok: requiredFieldsWereProvided, missingField } =
                validateRequiredFields(params, requiredFields);

            if (!requiredFieldsWereProvided) {
                return requiredFieldIsMissingResponse(missingField);
            }
            // console.log(requiredFields.ok);

            const userIdIsValid = checkIfIdIsValid(params.user_id);

            if (!userIdIsValid) {
                return IsIdInvalidResponse();
            }

            const dateIsValid = validator.isDate(params.date);
            if (!dateIsValid) {
                return badRequest({
                    message: `The ${params.date} is not a valid date!`,
                });
            }

            const amountIsValid = checkIfAmountIsValid(params.amount);
            if (!amountIsValid) invalidAmountResponse();

            const type = params.type.trim().toUpperCase();
            const typeIsValid = checkIfTypeIsValid(type);
            if (!typeIsValid) invalidTypeResponse;

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
