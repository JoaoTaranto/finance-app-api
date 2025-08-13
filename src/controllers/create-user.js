import { PostgresHelper } from "../database/postgres/helper.js";
import { CreateUserUseCase } from "../use-cases/create-user.js";
import { badRequest, created, serverError } from "./helpers.js";

import validator from "validator";

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

            const emailIsValid = validator.isEmail(params.email);
            if (!emailIsValid) {
                return badRequest({
                    message: "Invalid e-mail. Please provide a valid one",
                });
            }

            const usedEmail = await PostgresHelper.query(
                "SELECT * FROM users WHERE email = $1",
                [params.email],
            );
            if (usedEmail) {
                return badRequest({ message: "This email is already in use!" });
            }

            const passwordIsValid = params.password.length >= 6;
            if (!passwordIsValid) {
                return badRequest({
                    message: "Password must be at least 6 characters",
                });
            }

            // CREATE USER
            const createUserUseCase = new CreateUserUseCase();
            const createdUser = createUserUseCase.execute(params);
            console.log(createdUser);
            return created(createdUser);
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}
