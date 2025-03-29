import { View } from "react-native"
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput"

export const AllExpenses = () => {
  return <View style={{flex: 1}}><ExpensesOutput fallbackText="No Expenses Added" expensesPeriod={"All"} /></View>
}