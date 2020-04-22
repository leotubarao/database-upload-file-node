import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const findAppointment = await this.find();

    const income = findAppointment.reduce((total, { type, value }) => {
      return type === 'income' ? total + value : total;
    }, 0);

    const outcome = findAppointment.reduce((total, { type, value }) => {
      return type === 'outcome' ? total + value : total;
    }, 0);

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }
}

export default TransactionsRepository;
