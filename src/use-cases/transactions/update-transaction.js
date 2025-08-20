import { TransactionNotFoundError } from "../../errors/transaction.js";
export class UpdateTransactionUseCase {
    constructor(
        postgresUpdateTransactionRepository,
        postgresGetTransactionByIdRepository,
    ) {
        this.postgresUpdateTransactionRepository =
            postgresUpdateTransactionRepository;
        this.postgresGetTransactionByIdRepository =
            postgresGetTransactionByIdRepository;
    }
    async execute(transactionId, params) {
        const existingTransaction =
            await this.postgresGetTransactionByIdRepository.execute(
                transactionId,
            );

        if (!existingTransaction) throw new TransactionNotFoundError();
        const transaction =
            await this.postgresUpdateTransactionRepository.execute(
                transactionId,
                params,
            );
        return transaction;
    }
}
