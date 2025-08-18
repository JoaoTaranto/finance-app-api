import { EmailAlreadyInUseError } from "../errors/user.js";
import { CreateUserUseCase } from "../use-cases/index.js";
import {
    badRequest,
    created,
    serverError,
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    emailIsInvalidResponse,
    passwordIsInvalidResponse,
} from "./helpers/index.js";

export class CreateUserController {
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
            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({ message: `Missing param: ${field}` });
                }
            }

            const emailIsValid = checkIfEmailIsValid(params.email);
            if (!emailIsValid) return emailIsInvalidResponse();

            const passwordIsValid = checkIfPasswordIsValid(params.password);
            if (!passwordIsValid) return passwordIsInvalidResponse();

            // CREATE USER
            const createUserUseCase = new CreateUserUseCase();
            const createdUser = await createUserUseCase.execute(params);
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
