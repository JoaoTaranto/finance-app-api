import validator from "validator";
import { badRequest, ok } from "./helpers.js";
import { EmailAlreadyInUseError } from "../errors/user.js";
import { UpdateUserUseCase } from "../use-cases/update-user.js";
import { serverError } from "./helpers.js";

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            // console.log(httpRequest);
            const userId = httpRequest.params.userId;

            const isIdValid = validator.isUUID(userId);
            if (!isIdValid) {
                return badRequest({
                    message: "The provided id is not valid",
                });
            }

            const updateUserParams = httpRequest.body; // UNDEFINED???
            const allowedFields = [
                "first_name",
                "last_name",
                "email",
                "password",
            ];

            console.log(updateUserParams);
            const someFieldIsNotValid = Object.keys(updateUserParams).some(
                (field) => !allowedFields.includes(field),
            );
            if (someFieldIsNotValid) {
                return badRequest({
                    message: "Some provided field is not allowed",
                });
            }

            if (updateUserParams.email) {
                const emailIsValid = validator.isEmail(updateUserParams.email);
                if (!emailIsValid) {
                    return badRequest({
                        message: "Invalid e-mail. Please provide a valid one",
                    });
                }
            }

            if (updateUserParams.password) {
                const passwordIsValid = updateUserParams.password.length >= 6;
                if (!passwordIsValid) {
                    return badRequest({
                        message: "Password must be at least 6 characters",
                    });
                }
            }

            const updateUserUseCase = new UpdateUserUseCase();
            const updatedUser = await updateUserUseCase.execute(
                userId,
                updateUserParams,
            );
            return ok(updatedUser);
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message });
            }
            console.error(error);
            return serverError();
        }
    }
}
