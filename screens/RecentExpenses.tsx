import { Text, View } from "react-native"
import { ExpensesList } from "../components/ExpensesOutput/ExpensesList"
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput"

export const RecentExpenses = () => {
  return <View style={{flex: 1}}>
    <ExpensesOutput expensesPeriod="Last 7 days" />
    </View>
}