import {
    PostgresCreateTransactionRepository,
    PostgresGetTransactionsByUserIdRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateTransactionRepository,
} from "../../repositories/postgres/index.js";

import {
    CreateTransactionUseCase,
    GetTransactionsByUserIdUseCase,
    UpdateTransactionUseCase,
} from "../../use-cases/index.js";

import {
    CreateTransactionController,
    GetTransactionsByUserIdController,
    UpdateTransactionController,
} from "../../controllers/index.js";

export const makeCreateTransactionController = () => {
    const createTransactionRepository =
        new PostgresCreateTransactionRepository();

    const getUserByIdRepository = new PostgresGetUserByIdRepository();

    const createTransactionUseCase = new CreateTransactionUseCase(
        createTransactionRepository,
        getUserByIdRepository,
    );

    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase,
    );

    return createTransactionController;
};

export const makeGetTransactionsByUserIdController = () => {
    const postgresGetTransactionsByUserIdRepository =
        new PostgresGetTransactionsByUserIdRepository();
    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();

    const getTransactionsByUserIdUseCase = new GetTransactionsByUserIdUseCase(
        postgresGetTransactionsByUserIdRepository,
        postgresGetUserByIdRepository,
    );

    const getTransactionsByUserIdController =
        new GetTransactionsByUserIdController(getTransactionsByUserIdUseCase);

    return getTransactionsByUserIdController;
};

export const makeUpdateTransactionController = () => {
    const postgresUpdateTransactionRepository =
        new PostgresUpdateTransactionRepository();

    const updateTransactionUseCase = new UpdateTransactionUseCase(
        postgresUpdateTransactionRepository,
    );

    const updateTransactionController = new UpdateTransactionController(
        updateTransactionUseCase,
    );

    return updateTransactionController;
};
