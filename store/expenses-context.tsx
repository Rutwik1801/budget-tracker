import { createContext, PropsWithChildren, useReducer } from "react";

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

const dummyExpenses = [
  {
    id: 'e1',
    description: "Shoes",
    amount: 10.65,
    date: new Date('2025-03-19'),
    category: {label: "Others", value: "airplane-outline"},
    transactionType: "Expense"
  },
  {
    id: 'e2',
    description: "Pant",
    amount: 14.35,
    date: new Date('2025-03-19'),
    category: {label: "Briefcase", value: "briefcase-outline"},
    transactionType: "Expense"
  },
  {
    id: 'e3',
    description: "Shoes",
    amount: 103.50,
    date: new Date('2025-12-25'),
    category: {label: "Briefcase", value: "briefcase-outline"},
    transactionType: "Income"
  },
  {
    id: 'e4',
    description: "Book",
    amount: 10.65,
    date: new Date('2021-12-19'),
    category: {label: "Others", value: "airplane-outline"},
    transactionType: "Income"
  },
  {
    id: 'e11',
    description: "Shoes",
    amount: 10.65,
    date: new Date('2021-08-19'),
    category: {label: "Briefcase", value: "briefcase-outline"},
    transactionType: "Income"
  },
  {
    id: 'e21',
    description: "Pant",
    amount: 14.35,
    date: new Date('2021-12-19'),
    category: {label: "Others", value: "airplane-outline"},
    transactionType: "Income"
  },
  {
    id: 'e31',
    description: "Shoes",
    amount: 103.50,
    date: new Date('2025-12-25'),
    category: {label: "Others", value: "airplane-outline"},
    transactioNType: "Income"
  },
  {
    id: 'e41',
    description: "Book",
    amount: 10.65,
    date: new Date('2021-12-19'),
    category: {label: "Others", value: "airplane-outline"},
    transactionType: "Income"
  },
  {
    id: 'e112',
    description: "Shoes",
    amount: 10.65,
    date: new Date('2021-08-19'),
    category: {label: "Others", value: "airplane-outline"},
    transactionType: "Expense"
  },
  {
    id: 'e122',
    description: "Pant",
    amount: 14.35,
    date: new Date('2021-12-19'),
    category: {label: "Others", value: "airplane-outline"},
    transactionType: "Expense"
  },
  {
    id: 'e132',
    description: "Shoes",
    amount: 103.50,
    date: new Date('2025-12-25'),
    category: {label: "Others", value: "airplane-outline"},
    transactionType: "Expense"
  },
  {
    id: 'e142',
    description: "Book",
    amount: 10.65,
    date: new Date('2021-12-19'),
    category: {label: "Others", value: "airplane-outline"},
    transactionType: "Expense"
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
  },
  transactionType: "Expense" | "Income"
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