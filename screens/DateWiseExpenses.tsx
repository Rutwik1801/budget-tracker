import { View } from "react-native"
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput"

export const DateWiseExpenses = ({route}) => {
  const category = route.params?.category

  return <View style={{flex: 1}}>
    <ExpensesOutput fallbackText="No Recent Expenses" expensesPeriod={category.label} />
    </View>
}