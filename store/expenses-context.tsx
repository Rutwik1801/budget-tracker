import { createContext, useReducer } from "react";

const dummyExpenses = [
  {id: 'e1',
    description: "Shoes",
    amount: 10.65,
    date: new Date('2025-03-19')
  },
  {id: 'e2',
    description: "Pant",
    amount: 14.35,
    date: new Date('2025-03-19')
  },
  {id: 'e3',
    description: "Shoes",
    amount: 103.50,
    date: new Date('2025-12-25')
  },
  {id: 'e4',
    description: "Book",
    amount: 10.65,
    date: new Date('2021-12-19')
  },
  {id: 'e11',
    description: "Shoes",
    amount: 10.65,
    date: new Date('2021-08-19')
  },
  {id: 'e21',
    description: "Pant",
    amount: 14.35,
    date: new Date('2021-12-19')
  },
  {id: 'e31',
    description: "Shoes",
    amount: 103.50,
    date: new Date('2025-12-25')
  },
  {id: 'e41',
    description: "Book",
    amount: 10.65,
    date: new Date('2021-12-19')
  },
  {id: 'e112',
    description: "Shoes",
    amount: 10.65,
    date: new Date('2021-08-19')
  },
  {id: 'e122',
    description: "Pant",
    amount: 14.35,
    date: new Date('2021-12-19')
  },
  {id: 'e132',
    description: "Shoes",
    amount: 103.50,
    date: new Date('2025-12-25')
  },
  {id: 'e142',
    description: "Book",
    amount: 10.65,
    date: new Date('2021-12-19')
  }
]

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => { },
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => { }
});

export const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString()
      return [{...action.payload, id},...state]
      case 'UPDATE':
        const updateExpenseIdx = state.findIndex((expense => expense.id === action.payload.expenseId))
        return state.map((expense, idx) =>
          idx === updateExpenseIdx
            ? { ...expense, ...action.payload.expenseData }
            : expense
        );
        case "DELETE":
          return state.filter((expense) => expense.id !== action.payload)
          default:
            return state;
  }
}

export const ExpensesContextProvider = ({children}) => {
  const[expensesState, dispatch] = useReducer(expensesReducer, dummyExpenses);
  const addExpense = (expenseData) => {
    dispatch({type: "ADD", payload: expenseData});
  }
  const deleteExpense = (expenseId) => {
    dispatch({type: "DELETE", payload: expenseId});
  }
  const updateExpense = (expenseId, expenseData) => {
    dispatch({type: "UPDATE", payload: {expenseId, expenseData}});
  }
  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense
  }
  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}