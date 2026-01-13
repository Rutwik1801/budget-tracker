import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput"
import { View } from "../components/base"

export const AllExpenses = () => {
  return <View className="flex-1"><ExpensesOutput fallbackText="No Expenses Added" expensesPeriod={"All"} /></View>
}