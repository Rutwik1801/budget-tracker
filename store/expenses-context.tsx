import { createContext, PropsWithChildren, useReducer } from "react";

const dummyExpenses = [
  {
    id: 'e1',
    description: "Shoes",
    amount: 10.65,
    date: new Date('2025-03-19'),
    category: {label: "Others", value: "airplane-outline"}
  },
  {
    id: 'e2',
    description: "Pant",
    amount: 14.35,
    date: new Date('2025-03-19'),
    category: {label: "Others", value: "airplane-outline"}
  },
  {
    id: 'e3',
    description: "Shoes",
    amount: 103.50,
    date: new Date('2025-12-25'),
    category: {label: "Others", value: "airplane-outline"}
  },
  {
    id: 'e4',
    description: "Book",
    amount: 10.65,
    date: new Date('2021-12-19'),
    category: {label: "Others", value: "airplane-outline"}
  },
  {
    id: 'e11',
    description: "Shoes",
    amount: 10.65,
    date: new Date('2021-08-19'),
    category: {label: "Others", value: "airplane-outline"}
  },
  {
    id: 'e21',
    description: "Pant",
    amount: 14.35,
    date: new Date('2021-12-19'),
    category: {label: "Others", value: "airplane-outline"}
  },
  {
    id: 'e31',
    description: "Shoes",
    amount: 103.50,
    date: new Date('2025-12-25'),
    category: {label: "Others", value: "airplane-outline"}
  },
  {
    id: 'e41',
    description: "Book",
    amount: 10.65,
    date: new Date('2021-12-19'),
    category: {label: "Others", value: "airplane-outline"}
  },
  {
    id: 'e112',
    description: "Shoes",
    amount: 10.65,
    date: new Date('2021-08-19'),
    category: {label: "Others", value: "airplane-outline"}
  },
  {
    id: 'e122',
    description: "Pant",
    amount: 14.35,
    date: new Date('2021-12-19'),
    category: {label: "Others", value: "airplane-outline"}
  },
  {
    id: 'e132',
    description: "Shoes",
    amount: 103.50,
    date: new Date('2025-12-25'),
    category: {label: "Others", value: "airplane-outline"}
  },
  {
    id: 'e142',
    description: "Book",
    amount: 10.65,
    date: new Date('2021-12-19'),
    category: {label: "Others", value: "airplane-outline"}
  }
]

export type Expense = {
  id: string,
  description: string,
  amount: number,
  date: Date,
  category: {
    label: string,
    value: string
  }
}

export type ExpensesContextState = {
  expenses: Expense[],
  addExpense: (expense: Expense) => void,
  deleteExpense: (id: string) => void,
  updateExpense: (id: string, expense: Expense) => void
}

const initialExpensesState: ExpensesContextState = {
  expenses: [],
  addExpense: () => { },
  deleteExpense: () => { },
  updateExpense: () => { }
}

export const ExpensesContext = createContext(initialExpensesState);

export const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString()
      return [{ ...action.payload, id }, ...state]
    case 'UPDATE':
      const updateExpenseIdx = state.findIndex(((expense: Expense) => expense.id === action.payload.expenseId))
      return state.map((expense: Expense, idx: number) =>
        idx === updateExpenseIdx
          ? { ...expense, ...action.payload.expenseData }
          : expense
      );
    case "DELETE":
      return state.filter((expense: Expense) => expense.id !== action.payload)
    default:
      return state;
  }
}

export const ExpensesContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, dummyExpenses);
  const addExpense = (expenseData: Expense) => {
    dispatch({ type: "ADD", payload: expenseData });
  }
  const deleteExpense = (expenseId: string) => {
    dispatch({ type: "DELETE", payload: expenseId });
  }
  const updateExpense = (expenseId: string, expenseData: Expense) => {
    dispatch({ type: "UPDATE", payload: { expenseId, expenseData } });
  }
  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense
  }
  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}