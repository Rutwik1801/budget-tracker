import { StyleSheet, Text, View } from "react-native"
import { ExpensesSummary } from "./ExpensesSummary"
import { ExpensesList } from "./ExpensesList"
import { GlobalStyles } from "../../constants/styles"
import { ExpensesContext } from "../../store/expenses-context"
import { useContext } from "react"
import { useRoute } from "@react-navigation/native"
import { getTransactionFilteredExpenses } from "../../utils/date"

export const ExpensesOutput: React.FC<{ expensesPeriod: string, fallbackText: string }> = ({ expensesPeriod, fallbackText }) => {
  const { expenses } = useContext(ExpensesContext)

  const route = useRoute();
  const { type } = route?.params
  const filteredExpenses = getTransactionFilteredExpenses(expenses, type)
  let content = <Text style={styles.infoText}>{fallbackText}</Text>

  if (expenses.length > 0) {
    content = <ExpensesList expenses={filteredExpenses} />
  }

  return <View style={styles.container}>
    <ExpensesSummary expenses={filteredExpenses} periodName={expensesPeriod} />
    {content}
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: GlobalStyles.colors.primary50,
  },
  infoText: {
    color: GlobalStyles.colors.primary50,
    fontSize: 16,
    textAlign: "center",
    marginTop: 32
  }
})