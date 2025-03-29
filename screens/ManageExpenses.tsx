import { useContext, useLayoutEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { GlobalStyles } from "../constants/styles"
import { ExpensesContext } from "../store/expenses-context"
import { ExpenseForm } from "../components/manageExpense/ExpenseForm"
import { addExpense, deleteExpense, updateExpense } from "../utils/rest"
import { LoadingOverlay } from "../components/UI/LoadingOverlay"
import { ErrorOverlay } from "../components/UI/ErrorOverlay"

export const ManageExpenses = ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId
      const expensesCtx = useContext(ExpensesContext)

    const deleteExpenseHandler = async () => {
      setIsLoading(true)
      try {
        await deleteExpense(editedExpenseId)
        expensesCtx.deleteExpense(editedExpenseId)
      } catch (err) {
        setError("Could not delete the expense")
      }
      setIsLoading(false)
      navigation.goBack();
    }
    const confirmHandler = async (expenseData: any) => {
      setIsLoading(true)
      const expenseObject = {
        ...expenseData,
        date: new Date(expenseData.date),
        amount: parseFloat(parseFloat(expenseData.amount).toFixed(2)),
      }
      try {
        if(isEditing) {
          expensesCtx.updateExpense(editedExpenseId, expenseObject)
          await updateExpense(editedExpenseId, expenseObject);
        } else {
          const expenseId = await addExpense(expenseObject)
          expensesCtx.addExpense({...expenseObject,id: expenseId.toString()})
        }
      } catch (err) {
        setError(`Could not ${isEditing ? "Update" : "Add"} the expense`)
      }
      setIsLoading(false)
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

  if(error && !isLoading) return <ErrorOverlay message={error} onConfirm={() => setError(null)} />
  if(isLoading) return <LoadingOverlay />
  return <View style={styles.container} >
    <ExpenseForm onSubmit={confirmHandler} onDelete={deleteExpenseHandler} onCancel={cancelPressHandler} editedExpenseId={editedExpenseId} />
      </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700
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