import { createContext, PropsWithChildren, useReducer, useState } from "react";
import { Expense, ExpensesContextState } from "../utils/types";

export const iconsList = [
  { label: "Travel", value: "airplane-outline" },
  { label: "Grocery", value: "basket-outline" },
  { label: "Savings", value: "cash-outline" },
  { label: "Repairs", value: "battery-full-outline" },
  { label: "Education", value: "book-outline" },
  { label: "Work", value: "briefcase-outline" },
  { label: "Essentials", value: "brush-outline" },
  { label: "Business", value: "business-outline" },
  { label: "Vehicle", value: "car-outline" },
  { label: "Fitness", value: "fitness-outline" },
  { label: "Gift", value: "gift-outline" },
  { label: "Medical", value: "heart-outline" },
  { label: "House", value: "home-outline" },
  { label: "Restaurant", value: "restaurant-outline" },
  { label: "Bills", value: "recipt-outline" },
  { label: "Subscriptions", value: "mail-outline" },
  { label: "Tickets", value: "ticket-outline" },
  { label: "Others", value: "code-working-outline" }
];

const initialExpensesState: ExpensesContextState = {
  expenses: [],
  addExpense: () => { },
  setExpenses: () => {},
  deleteExpense: () => { },
  updateExpense: () => { },
  currency: "USD"
}

export const ExpensesContext = createContext(initialExpensesState);

export const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state]
      case "SET":
        return action.payload.reverse();
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
  const [expensesState, dispatch] = useReducer(expensesReducer, []);
  const [currency, setCurrency] = useState("USD")
  const addExpense = (expenseData: Expense) => {
    dispatch({ type: "ADD", payload: expenseData });
  }
  const setExpenses = (expenses: Expense[]) => {
    dispatch({ type: "SET", payload: expenses });
  }
  const deleteExpense = (expenseId: string) => {
    dispatch({ type: "DELETE", payload: expenseId });
  }
  const updateExpense = (expenseId: string, expenseData: Expense) => {
    dispatch({ type: "UPDATE", payload: { expenseId, expenseData } });
  }
  const value = {
    expenses: expensesState,
    setExpenses,
    addExpense,
    deleteExpense,
    updateExpense,
    currency
  }
  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}