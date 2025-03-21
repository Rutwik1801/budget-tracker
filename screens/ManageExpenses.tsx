import { useContext, useLayoutEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import { IconButton } from "../components/UI/IconButton"
import { GlobalStyles } from "../constants/styles"
import { Button } from "../components/UI/Button"
import { ExpensesContext } from "../store/expenses-context"
import { ExpenseForm } from "../components/manageExpense/ExpenseForm"

export const ManageExpenses = ({route, navigation}) => {
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId
      const expensesCtx = useContext(ExpensesContext)

    const deleteExpenseHandler = () => {
      expensesCtx.deleteExpense(editedExpenseId)
      navigation.goBack();
    }
    const confirmHandler = (expenseData) => {
      const expenseObject = {
        ...expenseData,
        id: editedExpenseId ? editedExpenseId : Math.random().toString(),
        date: new Date(expenseData.date),
        amount: parseFloat(expenseData.amount).toFixed(2),
      }
      if(isEditing) {
        expensesCtx.updateExpense(editedExpenseId, expenseObject)
      } else {
        expensesCtx.addExpense(expenseObject)
      }
      navigation.goBack();
    }
    const cancelPressHandler = () => {
      navigation.goBack();
    }
  
  
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense"
    })
  }, [navigation, isEditing])


  return <View style={styles.container} >
    <ExpenseForm onSubmit={confirmHandler} onDelete={deleteExpenseHandler} onCancel={cancelPressHandler} editedExpenseId={editedExpenseId} />
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