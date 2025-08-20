import {
    EmailAlreadyInUseError,
    UserNotFoundError,
} from "../../errors/user.js";
import {
    badRequest,
    ok,
    serverError,
    checkIfEmailIsValid,
    checkIfIdIsValid,
    checkIfPasswordIsValid,
    emailIsInvalidResponse,
    IsIdInvalidResponse,
    passwordIsInvalidResponse,
    userNotFoundResponse,
} from "../helpers/index.js";

export class UpdateUserController {
    constructor(updateUserUseCase) {
        this.updateUserUseCase = updateUserUseCase;
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;

            const isIdValid = checkIfIdIsValid(userId);
            if (!isIdValid) return IsIdInvalidResponse();

            const params = httpRequest.body; // UNDEFINED???
            const allowedFields = [
                "first_name",
                "last_name",
                "email",
                "password",
            ];

            const someFieldIsNotValid = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            );
            if (someFieldIsNotValid) {
                return badRequest({
                    message: "Some provided field is not allowed",
                });
            }

            if (params.email) {
                const emailIsValid = checkIfEmailIsValid(params.email);
                if (!emailIsValid) return emailIsInvalidResponse();
            }

            if (params.password) {
                const passwordIsValid = checkIfPasswordIsValid(params.password);
                if (!passwordIsValid) return passwordIsInvalidResponse();
            }

            const updatedUser = await this.updateUserUseCase.execute(
                userId,
                params,
            );
            return ok(updatedUser);
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message });
            }
            if (error instanceof UserNotFoundError)
                return userNotFoundResponse();

            console.error(error);
            return serverError();
        }
    }
}
