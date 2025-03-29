import { Pressable, StyleSheet, Text, View } from "react-native"
import { GlobalStyles } from "../../constants/styles"
import { getCurrencyFormattedText, getFormattedDate } from "../../utils/utilFunctions"
import { useNavigation } from "@react-navigation/native"
import { IconButton } from "../UI/IconButton"
import { Expense } from "../../utils/types"
import { useContext } from "react"
import { ExpensesContext } from "../../store/expenses-context"

export const ExpenseItem: React.FC<Expense> = ({ id, description, amount, date, category, transactionType }) => {
  const navigation = useNavigation()
  const { currency } = useContext(ExpensesContext)

  const expensePressHandler = () => {
    navigation.navigate("ManageExpense", { expenseId: id })
  }

  return <Pressable onPress={expensePressHandler}
    style={({ pressed }) => pressed && styles.pressed}
  >
    <View style={styles.expenseItem}>
      <View style={styles.detailsContainer}>
        <Text style={styles.textBase} >{description}</Text>
        <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={[
          styles.amount,
          transactionType === "Income" && { color: "green" }
        ]}
        >{getCurrencyFormattedText(amount, currency)}</Text>
        <View style={styles.categoryContainer}>
          <IconButton icon={category.value} size={14} color={GlobalStyles.colors.primary800} onPress={() => { }} />
          <Text style={styles.categoryText}>{category.label}</Text>
        </View>
      </View>
    </View>
  </Pressable>
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary800,
    borderColor: GlobalStyles.colors.primary400,
    borderRadius: 8,
    elevation: 3,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold'
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 4,
    minWidth: 80,
    height: 30
  },
  amount: {
    color: GlobalStyles.colors.error500,
    fontSize: 20
  },
  categoryText: { color: GlobalStyles.colors.primary800 },
  categoryContainer: { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: GlobalStyles.colors.primary50, borderRadius: 3, paddingRight: 8, minWidth: 120 }
})