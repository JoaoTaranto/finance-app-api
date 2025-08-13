import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js";
import { ok, serverError } from "./helpers.js";
import { badRequest } from "./helpers.js";

import validator from "validator";
export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const userIdIsValid = validator.isUUID(httpRequest.params.userId);
            if (!userIdIsValid) {
                return badRequest({ message: "The provided ID is not valid." });
            }
            const getUserByIdUseCase = new GetUserByIdUseCase();
            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            );

            return ok(user);
        } catch (error) {
            console.error(error);
            serverError();
        }
    }
}
