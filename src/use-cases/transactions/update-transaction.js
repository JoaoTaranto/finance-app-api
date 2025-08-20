export class UpdateTransactionUseCase {
    constructor(postgresUpdateTransactionRepository) {
        this.postgresUpdateTransactionRepository =
            postgresUpdateTransactionRepository;
    }
    async execute(params) {
        const transaction =
            await this.postgresUpdateTransactionRepository.execute(params);

        return transaction;
    }
}
