export type Category = {
  label: string;
  value: string
}
export type Expense = {
  id: string,
  description: string,
  amount: number,
  date: Date,
  category: Category,
  transactionType: "Expense" | "Income"
}

export type ExpensesContextState = {
  expenses: Expense[],
  addExpense: (expense: Expense) => void,
  setExpenses: (expenses: Expense[]) => void,
  deleteExpense: (id: string) => void,
  updateExpense: (id: string, expense: Expense) => void,
  currency: string
}
