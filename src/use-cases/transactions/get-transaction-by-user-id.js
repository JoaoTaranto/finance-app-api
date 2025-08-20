import { UserNotFoundError } from "../../errors/user.js";

export class GetTransactionsByUserIdUseCase {
    constructor(
        postgresGetTransactionsByUserIdRepository,
        postgresGetUserByIdRepository,
    ) {
        this.postgresGetTransactionsByUserIdRepository =
            postgresGetTransactionsByUserIdRepository;
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository;
    }
    async execute(params) {
        const user = await this.postgresGetUserByIdRepository.execute(
            params.userId,
        );

        if (!user) {
            throw new UserNotFoundError();
        }
        const transactions =
            await this.postgresGetTransactionsByUserIdRepository.execute(
                params.userId,
            );

        return transactions;
    }
}
