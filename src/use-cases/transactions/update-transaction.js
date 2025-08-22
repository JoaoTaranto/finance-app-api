export class UpdateTransactionUseCase {
    constructor(postgresUpdateTransactionRepository) {
        this.postgresUpdateTransactionRepository =
            postgresUpdateTransactionRepository;
    }
    async execute(transactionId, params) {
        const transaction =
            await this.postgresUpdateTransactionRepository.execute(
                transactionId,
                params,
            );
        return transaction;
    }
}
