import { Expense, Category } from "./types";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
export const  getFormattedDate = (date: Date) => {
  if(typeof date === "string") {
    date = new Date(date)
  }
  return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`
}

export const getDateMinusDays = (date: Date, days: number) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}

export const getRandomDarkColor = () => {
  let color = "#";
  for (let i = 0; i < 3; i++) {
    let value = Math.floor(Math.random() * 128); // Limiting to darker shades (0-127)
    color += value.toString(16).padStart(2, "0");
  }
  return color;
};

export const getRecentExpenses = (allExpenses: Expense[]) => allExpenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    const expenseDate = new Date(expense.date)
    return (expenseDate >= date7DaysAgo) && (expenseDate <= today)
  })

export const getTransactionFilteredExpenses = (allExpenses: Expense[], type: string) => allExpenses.filter((expense) => 
  (type === "All" || type === expense.transactionType)
  )

export const getCategoryWiseExpenses = (allExpenses: Expense[], category: Category) => allExpenses.filter(expense => category.value === expense.category.value)

export const getExpenseSum = (expenses: Expense[], type: string) => expenses.reduce((sum: number, expense: Expense) => {
    if (type === "All") {
      return expense.transactionType === "Expense" ? sum - expense.amount : sum + expense.amount
    }
    return sum + (expense.amount ?? 0)
  }, 0)

export const getAnalyticsData = (expenses: Expense[]) => expenses.reduce(
  (acc, expense) => {
    const categoryKey = expense?.category?.value;
    const transactionType = expense?.transactionType;

    if (!categoryKey || !transactionType) return acc;

    // Handle category-based segregation
    if (!acc.segregatedExpenses[categoryKey]) {
      acc.segregatedExpenses[categoryKey] = {
        ids: [],
        total: 0,
        category: expense.category,
      };
    }
    acc.segregatedExpenses[categoryKey].ids.push(expense.id);
    acc.segregatedExpenses[categoryKey].total += expense.amount;
    acc.expensePieChartData[categoryKey] = (acc.expensePieChartData[categoryKey] || 0) + expense.amount;

    // Handle transaction type-based segregation
    acc.transactionBarChartData[transactionType] = (acc.transactionBarChartData[transactionType] || 0) + expense.amount;
    
    // Update total amount
    acc.totalAmount += expense.amount;

    return acc;
  },
  {
    segregatedExpenses: {},
    expensePieChartData: {},
    transactionBarChartData: {},
    totalAmount: 0,
  }
) 

export const splitIntoRows = (array: Category[], numRows: number) => {
  const rowSize = Math.ceil(array.length / numRows);
  return [array.slice(0, rowSize), array.slice(rowSize)];
};

export const getCurrencyFormattedText = (number: number, currency: string) => number.toLocaleString("en-US", {style:"currency", currency: currency})