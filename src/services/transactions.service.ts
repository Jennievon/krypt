import { Observable } from "rxjs";
import { Transaction } from "../libs/types";

export const TransactionsService = {
  getTransactions(address: string): Observable<Transaction[]> {
    const oldHistory = JSON.parse(localStorage.getItem("history") || "[]");
    const filteredHistoryByAddress = oldHistory.filter(
      (item: any) => item.address === address
    );
    return filteredHistoryByAddress;
  },

  addTransaction(newTransaction: Transaction, history: Transaction[]): void {
    const newHistory: any = [newTransaction, ...history];
    localStorage.setItem("history", JSON.stringify(newHistory));
  },
};
