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
      <View style={{flexDirection:"row", alignItems:"center"}}>
    <IconButton icon={category.value} size={30} background="#eee" color={GlobalStyles.colors.primary800} onPress={() => { }} />
      <View style={styles.detailsContainer}>
        <Text style={styles.textBase} >{description}</Text>
        <Text style={{color: GlobalStyles.colors.primary400, marginTop: 4}}>{getFormattedDate(date)}</Text>
      </View>
      </View>
        <Text style={[
          styles.amount,
          transactionType === "Income" && { color: GlobalStyles.colors.primaryGreen }
        ]}
        >{`${transactionType === "Income" ? "+" : "-"}${getCurrencyFormattedText(amount, currency)}`}</Text>
    </View>
  </Pressable>
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  expenseItem: {
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderColor: GlobalStyles.colors.primary400,
    borderRadius: 12,
    elevation: 3,
  },
  detailsContainer: {
    marginLeft: 4
  },
  textBase: {
    color: GlobalStyles.colors.primary800,
    fontSize: 20
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold'
  },
  amount: {
    color: GlobalStyles.colors.error500,
    fontSize: 20
  },
  categoryText: { color: GlobalStyles.colors.primary800 },
})