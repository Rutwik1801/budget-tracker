import { StyleSheet, Text, View } from "react-native"
import { GlobalStyles } from "../../constants/styles"
import { useRoute } from "@react-navigation/native";
import { getCurrencyFormattedText, getExpenseSum } from "../../utils/utilFunctions";
import { Expense } from "../../utils/types";
import { useContext } from "react";
import { ExpensesContext } from "../../store/expenses-context";

export const ExpensesSummary: React.FC<{ periodName: string, expenses: Expense[] }> = ({ periodName, expenses }) => {
  const route = useRoute();
  const { type } = route?.params
  const { currency } = useContext(ExpensesContext)
  const expensesSum = getExpenseSum(expenses, type)

  return <View style={styles.container}>
    <Text style={styles.period} >{periodName}</Text>
    <Text style={[styles.sum, { color: (expensesSum < 0 || type === "Expense") ? GlobalStyles.colors.primaryRed : GlobalStyles.colors.primaryGreen }]}
    >{`${expensesSum >=0 ? "+" : "-"}${getCurrencyFormattedText(expensesSum, currency)}`}</Text>
  </View>
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
    paddingHorizontal: 24,
    minWidth:200,
    alignItems:"center",
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 10,
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignSelf:"center",
    marginBottom: 4,
  },
  period: {
    fontSize: 16,
    fontWeight:"bold",
    color: GlobalStyles.colors.primary800,
    marginBottom: 8
  },
  sum: {
    fontSize: 32,
    color: GlobalStyles.colors.primary50
  }
})