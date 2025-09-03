import { CreateUserController } from "./create-user.js";

describe("Create User Controller", () => {
    class CreateUserUseCaseStub {
        execute(user) {
            return user;
        }
    }

    it("should return 201 when creating an user successfully", async () => {
        // arrange
        const createUserUseCase = new CreateUserUseCaseStub();
        const createUserController = new CreateUserController(
            createUserUseCase,
        );

        const httpRequest = {
            body: {
                first_name: "John",
                last_name: "Doe",
                email: "teste@email.com.br",
                password: "123456",
            },
        };

        // act
        const result = await createUserController.execute(httpRequest);

        // assert
        expect(result.statusCode).toBe(201);
        expect(result.body).toBe(httpRequest.body);
    });
});
