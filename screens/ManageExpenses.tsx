import { useContext, useLayoutEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import { IconButton } from "../components/UI/IconButton"
import { GlobalStyles } from "../constants/styles"
import { Button } from "../components/UI/Button"
import { ExpensesContext } from "../store/expenses-context"

export const ManageExpenses = ({route, navigation}) => {
  const expensesCtx = useContext(ExpensesContext)
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense"
    })
  }, [navigation, isEditing])

  const deleteExpenseHandler = () => {
    expensesCtx.deleteExpense(editedExpenseId)
    navigation.goBack();
  }
  const confirmHandler = () => {
    if(isEditing) {
      expensesCtx.updateExpense(editedExpenseId, { description: "Updated now"})
    } else {
      expensesCtx.addExpense({date: new Date(), description: "fffff", amount: 23.333, id: Math.random()})
    }
    navigation.goBack();
  }
  const cancelPressHandler = () => {
    navigation.goBack();
  }

  return <View style={styles.container} >
    <View style={styles.buttonContainer}>
      <Button buttonContainerStyle={styles.button} mode="flat" onPress={cancelPressHandler} >Cancel</Button>
      <Button buttonContainerStyle={styles.button} onPress={confirmHandler} >{isEditing ? "Update" : "Add"}</Button>
    </View>
    {isEditing && <View style={styles.delete} ><IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler} /></View>}
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary500
  },
  delete: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection:"row",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  }
})