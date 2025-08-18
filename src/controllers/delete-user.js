import { DeleteUserUseCase } from "../use-cases";
import {
    checkIfIdIsValid,
    IsIdInvalidResponse,
    ok,
    serverError,
} from "./helpers/index";

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;
            const idIsValid = checkIfIdIsValid(userId);
            if (!idIsValid) return IsIdInvalidResponse();

            const deleteUserUseCase = new DeleteUserUseCase();
            const deletedUser = deleteUserUseCase.execute(userId);
            return ok(deletedUser);
        } catch (error) {
            console.error(error);
            return serverError();
        }
    }
}
