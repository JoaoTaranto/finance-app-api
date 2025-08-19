import "dotenv/config.js";
import express from "express";
import {
    CreateUserController,
    DeleteUserController,
    GetUserByIdController,
    UpdateUserController,
} from "./src/controllers/index.js";
import {
    GetUserByIdUseCase,
    CreateUserUseCase,
    DeleteUserUseCase,
    UpdateUserUseCase,
} from "./src/use-cases/index.js";
import {
    PostgresGetUserByIdRepository,
    PostgresCreateUserRepository,
    PostgresGetUserByEmailRepository,
    PostgresDeleteUserRepository,
    PostgresUpdateUserRepository,
} from "./src/repositories/postgres/index.js";

const app = express();

app.use(express.json());

app.get("/api/users/:userId", async (request, response) => {
    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository();
    const getUserByIdUseCase = new GetUserByIdUseCase(
        postgresGetUserByIdRepository,
    );
    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

    const { statusCode, body } = await getUserByIdController.execute(request);
    response.status(statusCode).send(body);
});

app.post("/api/users", async (request, response) => {
    const postgresCreateUserRepository = new PostgresCreateUserRepository();
    const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository();
    const createUserUseCase = new CreateUserUseCase(
        postgresCreateUserRepository,
        postgresGetUserByEmailRepository,
    );

    const createUserController = new CreateUserController(createUserUseCase);
    const { statusCode, body } = await createUserController.execute(request);
    response.status(statusCode).send(body);
});

app.patch("/api/users/:userId", async (request, response) => {
    const postgresUpdateUserRepository = new PostgresUpdateUserRepository();
    const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository();
    const updateUserUseCase = new UpdateUserUseCase(
        postgresUpdateUserRepository,
        postgresGetUserByEmailRepository,
    );
    const updateUserController = new UpdateUserController(updateUserUseCase);

    const { statusCode, body } = await updateUserController.execute(request);
    response.status(statusCode).send(body);
});

app.delete("/api/users/:userId", async (request, response) => {
    const postgresDeleteUserRepository = new PostgresDeleteUserRepository();
    const deleteUserUseCase = new DeleteUserUseCase(
        postgresDeleteUserRepository,
    );
    const deleteUserController = new DeleteUserController(deleteUserUseCase);

    const { statusCode, body } = await deleteUserController.execute(request);
    response.status(statusCode).send(body);
});

app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}`),
);
