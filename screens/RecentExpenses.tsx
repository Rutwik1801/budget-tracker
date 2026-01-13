import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput"
import { View } from "../components/base"

export const RecentExpenses = () => {
  return (
    <View className="flex-1">
      <ExpensesOutput fallbackText="No Recent Expenses" expensesPeriod="Last 7 days" />
    </View>
  )
}