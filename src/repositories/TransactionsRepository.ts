import Transaction from '../models/Transaction';

interface CreateTransactionDto {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = { income: 0, outcome: 0, total: 0 };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balanceMap = this.transactions.reduce(
      (accumulator, current) => {
        return {
          income:
            current.type === 'income'
              ? accumulator.income + current.value
              : accumulator.income,
          outcome:
            current.type === 'outcome'
              ? accumulator.outcome + current.value
              : accumulator.outcome,
        };
      },
      { income: 0, outcome: 0 },
    );

    const balance = {
      ...balanceMap,
      total: balanceMap.income - balanceMap.outcome,
    };

    this.balance = balance;

    return this.balance;
  }

  public create({ title, type, value }: CreateTransactionDto): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
