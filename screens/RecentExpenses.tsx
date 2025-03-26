import { View } from "react-native"
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput"
import { useContext } from "react"
import { ExpensesContext } from "../store/expenses-context"
import { getDateMinusDays } from "../utils/date"

export const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext)
  let recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    const expenseDate = new Date(expense.date)
    return (expenseDate >= date7DaysAgo) && (expenseDate <= today)
  })
  return <View style={{flex: 1}}>
    <ExpensesOutput fallbackText="No Recent Expenses" expenses={recentExpenses} expensesPeriod="Last 7 days" />
    </View>
}