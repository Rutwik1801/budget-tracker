import { Pressable, StyleSheet, Text, View } from "react-native"
import { GlobalStyles } from "../../constants/styles"
import { getFormattedDate } from "../../utils/date"
import { useNavigation } from "@react-navigation/native"
import { Expense } from "../../store/expenses-context"

export const ExpenseItem: React.FC<Expense> = ({id, description, amount, date}) => {
  const navigation = useNavigation()
  const expensePressHandler = () => {
    navigation.navigate("ManageExpense", {expenseId: id})
  }
  return <Pressable onPress={expensePressHandler} 
    style={({pressed}) => pressed && styles.pressed}
    >
    <View style={styles.expenseItem}>
      <View style={styles.detailsContainer}>
      <Text style={styles.textBase} >{description}</Text>
      <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
      </View>
      <View style={styles.amountContainer}>
      <Text style={styles.amount} >{`$${amount}`}</Text>
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
    borderRadius: 3,
    elevation: 3,
  },
  detailsContainer: {
    flexDirection:"row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
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
    justifyContent: "center",
    borderRadius: 4,
    minWidth: 80
  },
  amount: {
    color:GlobalStyles.colors.error500,
    fontSize: 25
  }
})