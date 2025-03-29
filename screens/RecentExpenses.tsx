import { View } from "react-native"
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput"

export const RecentExpenses = () => {

  return <View style={{flex: 1}}>
    <ExpensesOutput fallbackText="No Recent Expenses" expensesPeriod="Last 7 days" />
    </View>
}