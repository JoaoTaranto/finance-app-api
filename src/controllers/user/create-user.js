import { EmailAlreadyInUseError } from "../../errors/user.js";
import {
    badRequest,
    created,
    serverError,
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    emailIsInvalidResponse,
    passwordIsInvalidResponse,
    validateRequiredFields,
} from "../helpers/index.js";

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }

    // GET REQUESTS
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
            const { ok: requiredFieldsWereProvided, missingField } =
                validateRequiredFields(params, requiredFields);

            if (!requiredFieldsWereProvided) {
                return badRequest({
                    message: `The field ${missingField} is required`,
                });
            }

            const emailIsValid = checkIfEmailIsValid(params.email);
            if (!emailIsValid) return emailIsInvalidResponse();

            const passwordIsValid = checkIfPasswordIsValid(params.password);
            if (!passwordIsValid) return passwordIsInvalidResponse();

            // CREATE USER
            const createdUser = await this.createUserUseCase.execute(params);
            return created(createdUser);
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message });
            }

            console.error(error);
            return serverError();
        }
    }
}
