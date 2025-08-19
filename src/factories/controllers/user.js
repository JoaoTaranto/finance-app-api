import {
    CreateUserController,
    DeleteUserController,
    GetUserByIdController,
    UpdateUserController,
} from "../../controllers/index.js";
import {
    GetUserByIdUseCase,
    CreateUserUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
} from "../../use-cases/index.js";
import {
    PostgresGetUserByIdRepository,
    PostgresCreateUserRepository,
    PostgresGetUserByEmailRepository,
    PostgresDeleteUserRepository,
    PostgresUpdateUserRepository,
} from "../../repositories/postgres/index.js";

export const makeGetUserByIdController = () => {
    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();

    const getUserByIdUseCase = new GetUserByIdUseCase(
        postgresGetUserByIdRepository,
    );

    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);
    return getUserByIdController;
};

export const makeCreateUserController = () => {
    const postgresCreateUserRepository = new PostgresCreateUserRepository();

    const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository();

    const createUserUseCase = new CreateUserUseCase(
        postgresCreateUserRepository,
        postgresGetUserByEmailRepository,
    );

    const createUserController = new CreateUserController(createUserUseCase);
    return createUserController;
};

export const makeUpdateUserController = () => {
    const postgresUpdateUserRepository = new PostgresUpdateUserRepository();

    const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository();

    const updateUserUseCase = new UpdateUserUseCase(
        postgresUpdateUserRepository,
        postgresGetUserByEmailRepository,
    );

    const updateUserController = new UpdateUserController(updateUserUseCase);
    return updateUserController;
};

export const makeDeleteUserController = () => {
    const postgresDeleteUserRepository = new PostgresDeleteUserRepository();

    const deleteUserUseCase = new DeleteUserUseCase(
        postgresDeleteUserRepository,
    );

    const deleteUserController = new DeleteUserController(deleteUserUseCase);
    return deleteUserController;
};
