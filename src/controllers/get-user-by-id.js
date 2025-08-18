import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js";
import {
    checkIfIdIsValid,
    IsIdInvalidResponse,
    notFound,
    ok,
    serverError,
} from "./helpers/index.js";
export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const isIdValid = checkIfIdIsValid(httpRequest.params.id);
            if (!isIdValid) return IsIdInvalidResponse();

            const getUserByIdUseCase = new GetUserByIdUseCase();
            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            );

            if (!user) return notFound({ message: "User not found!" });

            return ok(user);
        } catch (error) {
            console.error(error);
            serverError();
        }
    }
}
