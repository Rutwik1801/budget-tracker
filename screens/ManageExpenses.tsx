import { useContext, useLayoutEffect, useState } from "react"
import { ExpensesContext } from "../store/expenses-context"
import { ExpenseForm } from "../components/manageExpense/ExpenseForm"
import { addExpense, deleteExpense, updateExpense } from "../utils/rest"
import { LoadingOverlay } from "../components/UI/LoadingOverlay"
import { ErrorOverlay } from "../components/UI/ErrorOverlay"
import { AuthContext } from "../store/auth-context"
import { View } from "../components/base"

export const ManageExpenses = ({route, navigation}) => {
  const { isLoggedIn, userCredentials } = useContext(AuthContext)
  const {idToken, localId} = userCredentials
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const editedExpenseId = route.params?.expenseId
  const isEditing = !!editedExpenseId
  const expensesCtx = useContext(ExpensesContext)

  const deleteExpenseHandler = async () => {
    setIsLoading(true)
    try {
      await deleteExpense(idToken, localId, editedExpenseId)
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
        await updateExpense(idToken, localId, editedExpenseId, expenseObject);
      } else {
        const expenseId = await addExpense(idToken, localId, expenseObject)
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
  return (
    <View className="flex-1 p-6 bg-white">
      <ExpenseForm onSubmit={confirmHandler} onDelete={deleteExpenseHandler} onCancel={cancelPressHandler} editedExpenseId={editedExpenseId} />
    </View>
  )
}