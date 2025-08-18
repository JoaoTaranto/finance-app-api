import { GetUserByIdUseCase } from "../use-cases/index.js";
import {
    checkIfIdIsValid,
    IsIdInvalidResponse,
    ok,
    serverError,
    userNotFoundResponse,
} from "./helpers/index.js";
export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isIdValid = checkIfIdIsValid(httpRequest.params.userId);
            if (!isIdValid) return IsIdInvalidResponse();

            const getUserByIdUseCase = new GetUserByIdUseCase();
            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            );

            if (!user) return userNotFoundResponse();

            return ok(user);
        } catch (error) {
            console.error(error);
            serverError();
        }
    }
}
