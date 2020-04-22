import path from 'path';
import fs from 'fs';
import csv from 'csvtojson';

import uploadConfig from '../config/upload';

import Transaction from '../models/Transaction';

import CreateTransactionService from './CreateTransactionService';

class ImportTransactionsService {
  async execute(filename: string): Promise<Transaction[]> {
    const createTransaction = new CreateTransactionService();

    const filePath = path.join(uploadConfig.directory, filename);

    const csvfile = await csv().fromFile(filePath);

    await fs.promises.unlink(filePath);

    const transactions: Transaction[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const item of csvfile) {
      // eslint-disable-next-line no-await-in-loop
      const transaction = await createTransaction.execute(item);

      transactions.push(transaction);
    }

    return transactions;
  }
}

export default ImportTransactionsService;
