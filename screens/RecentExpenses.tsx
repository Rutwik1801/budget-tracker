import { View } from "react-native"
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput"
import { useContext } from "react"
import { ExpensesContext } from "../store/expenses-context"
import { getDateMinusDays, getRecentExpenses } from "../utils/date"

export const RecentExpenses = ({route}) => {
  const {type} = route?.params
  const expensesCtx = useContext(ExpensesContext)
  const recentExpenses = getRecentExpenses(expensesCtx.expenses, type)

  return <View style={{flex: 1}}>
    <ExpensesOutput fallbackText="No Recent Expenses" expenses={recentExpenses} expensesPeriod="Last 7 days" />
    </View>
}