import {  StyleSheet, Text, View } from "react-native"
import { ExpensesSummary } from "./ExpensesSummary"
import { ExpensesList } from "./ExpensesList"
import { GlobalStyles } from "../../constants/styles"
import { Expense } from "../../store/expenses-context"

export const ExpensesOutput: React.FC<{expenses: Expense[], expensesPeriod: string, fallbackText: string}> = ({expenses, expensesPeriod, fallbackText}) => {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>

  if(expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />
  }

  return <View style={styles.container}>
    <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
    {content}
  </View>
}

const styles=StyleSheet.create({
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