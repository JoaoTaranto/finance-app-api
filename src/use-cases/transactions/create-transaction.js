import { v4 as uuidv4 } from "uuid";
import { UserNotFoundError } from "../../errors/user.js";

export class CreateTransactionUseCase {
    constructor(
        postgresCreateTransactionRepository,
        postgresGetUserByIdRepository,
    ) {
        this.postgresCreateTransactionRepository =
            postgresCreateTransactionRepository;
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository;
    }
    async execute(createTransactionParams) {
        const userId = createTransactionParams.user_id;

        const user = await this.postgresGetUserByIdRepository.execute(userId);

        if (!user) {
            throw new UserNotFoundError();
        }

        const transaction_id = uuidv4();

        const transaction =
            await this.postgresCreateTransactionRepository.execute({
                ...createTransactionParams,
                id: transaction_id,
            });

        return transaction;
    }
}
