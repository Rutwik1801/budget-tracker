import { createContext, PropsWithChildren, useReducer, useState } from "react";
import { Expense, ExpensesContextState } from "../utils/types";

export const iconsList = [
  { label: "Addition", value: "add-circle-outline" },
  { label: "Travel", value: "airplane-outline" },
  { label: "Alarm", value: "alarm-outline" },
  { label: "Analytics", value: "analytics-outline" },
  { label: "Basket", value: "basket-outline" },
  { label: "Battery", value: "battery-full-outline" },
  { label: "Book", value: "book-outline" },
  { label: "Briefcase", value: "briefcase-outline" },
  { label: "Brush", value: "brush-outline" },
  { label: "Business", value: "business-outline" },
  { label: "Calendar", value: "calendar-outline" },
  { label: "Camera", value: "camera-outline" },
  { label: "Car", value: "car-outline" },
  { label: "Chat", value: "chatbubble-outline" },
  { label: "Checkmark", value: "checkmark-circle-outline" },
  { label: "Cloud", value: "cloud-outline" },
  { label: "Compass", value: "compass-outline" },
  { label: "Document", value: "document-text-outline" },
  { label: "Download", value: "download-outline" },
  { label: "Earth", value: "earth-outline" },
  { label: "Fitness", value: "fitness-outline" },
  { label: "Flag", value: "flag-outline" },
  { label: "Folder", value: "folder-outline" },
  { label: "Gift", value: "gift-outline" },
  { label: "Globe", value: "globe-outline" },
  { label: "Heart", value: "heart-outline" },
  { label: "Home", value: "home-outline" },
  { label: "Lock", value: "lock-closed-outline" },
  { label: "Mail", value: "mail-outline" },
  { label: "Settings", value: "settings-outline" },
  { label: "Others", value: "code-working-outline" }
];

// const dummyExpenses = [
//   {
//     id: 'e1',
//     description: "Shoes",
//     amount: 10.65,
//     date: new Date('2025-03-19'),
//     category: {label: "Others", value: "airplane-outline"},
//     transactionType: "Expense"
//   },
//   {
//     id: 'e2',
//     description: "Pant",
//     amount: 14.35,
//     date: new Date('2025-03-19'),
//     category: {label: "Briefcase", value: "briefcase-outline"},
//     transactionType: "Expense"
//   },
//   {
//     id: 'e3',
//     description: "Shoes",
//     amount: 103.50,
//     date: new Date('2025-12-25'),
//     category: {label: "Briefcase", value: "briefcase-outline"},
//     transactionType: "Income"
//   },
//   {
//     id: 'e4',
//     description: "Book",
//     amount: 10.65,
//     date: new Date('2021-12-19'),
//     category: {label: "Others", value: "airplane-outline"},
//     transactionType: "Income"
//   },
//   {
//     id: 'e11',
//     description: "Shoes",
//     amount: 10.65,
//     date: new Date('2021-08-19'),
//     category: {label: "Briefcase", value: "briefcase-outline"},
//     transactionType: "Income"
//   },
//   {
//     id: 'e21',
//     description: "Pant",
//     amount: 14.35,
//     date: new Date('2021-12-19'),
//     category: {label: "Others", value: "airplane-outline"},
//     transactionType: "Income"
//   },
//   {
//     id: 'e31',
//     description: "Shoes",
//     amount: 103.50,
//     date: new Date('2025-12-25'),
//     category: {label: "Others", value: "airplane-outline"},
//     transactioNType: "Income"
//   },
//   {
//     id: 'e41',
//     description: "Book",
//     amount: 10.65,
//     date: new Date('2021-12-19'),
//     category: {label: "Others", value: "airplane-outline"},
//     transactionType: "Income"
//   },
//   {
//     id: 'e112',
//     description: "Shoes",
//     amount: 10.65,
//     date: new Date('2021-08-19'),
//     category: {label: "Others", value: "airplane-outline"},
//     transactionType: "Expense"
//   },
//   {
//     id: 'e122',
//     description: "Pant",
//     amount: 14.35,
//     date: new Date('2021-12-19'),
//     category: {label: "Others", value: "airplane-outline"},
//     transactionType: "Expense"
//   },
//   {
//     id: 'e132',
//     description: "Shoes",
//     amount: 103.50,
//     date: new Date('2025-12-25'),
//     category: {label: "Others", value: "airplane-outline"},
//     transactionType: "Expense"
//   },
//   {
//     id: 'e142',
//     description: "Book",
//     amount: 10.65,
//     date: new Date('2021-12-19'),
//     category: {label: "Others", value: "airplane-outline"},
//     transactionType: "Expense"
//   }
// ]

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