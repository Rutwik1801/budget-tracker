export const  getFormattedDate = (date: Date) => {
  if(typeof date === "string") {
    date = new Date(date)
  }
  return date.toISOString().slice(0,10);
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

export const getRecentExpenses = (allExpenses, type) => allExpenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    const expenseDate = new Date(expense.date)
    return (expenseDate >= date7DaysAgo) && (expenseDate <= today)
  }).filter(expense => (type === "All" || type === expense.transactionType))

export const getTransactionFilteredExpenses = (allExpenses, type) => allExpenses.filter((expense) => 
  (type === "All" || type === expense.transactionType)
  )
