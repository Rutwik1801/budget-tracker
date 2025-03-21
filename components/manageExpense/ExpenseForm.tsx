import {  StyleSheet, Text, TextInput, View } from "react-native"
import { Input } from "./Input"
import { GlobalStyles } from "../../constants/styles"
import { useContext, useState } from "react"
import { ExpensesContext } from "../../store/expenses-context"
import { IconButton } from "../UI/IconButton"
import { Button } from "../UI/Button"
import { getFormattedDate } from "../../utils/date"

export const ExpenseForm = ({onSubmit, onCancel, editedExpenseId, onDelete}) => {
  const expensesCtx = useContext(ExpensesContext)
    const isEditing = !!editedExpenseId;
    let editedExpense = {
      amount: "",
      date: "",
      description: ""
    }
    if(isEditing) {
      editedExpense = expensesCtx.expenses.find(item => item.id === editedExpenseId);
    }
  const [expense, setExpense] = useState({
    amount: isEditing ? editedExpense.amount.toString(): editedExpense.amount,
    description: editedExpense.description,
    date: isEditing ? getFormattedDate(editedExpense.date): editedExpense.date
  })

  const handleInputChange = (inputIdentifier, enteredValue) => {
    setExpense((prev) => ({...prev, [inputIdentifier]: enteredValue}))
  }
  return <View style={styles.form}>
    <Text style={styles.title} >Your Expense</Text>
    <View style={styles.inputsRow}>
    <Input style= {styles.rowInput} label="Amount" textInputConfig={{
      keyboardType: "decimal-pad",
      onChangeText: handleInputChange.bind(this, "amount"),
      value: expense.amount
    }} />
    <Input style={styles.rowInput} label="Date" textInputConfig={{
      placeholder: 'YYYY-MM-DD',
      maxlength:10,
      onChangeText: handleInputChange.bind(this, "date"),
      value: expense.date
    }} />
    </View>
    <Input label="Description" textInputConfig={{
      multiline: true,
      onChangeText: handleInputChange.bind(this, "description"),
      value: expense.description
    }} />

        <View style={styles.buttonContainer}>
          <Button buttonContainerStyle={styles.button} mode="flat" onPress={onCancel} >Cancel</Button>
          <Button buttonContainerStyle={styles.button} onPress={onSubmit.bind(this,expense)} >{isEditing ? "Update" : "Add"}</Button>
        </View>
        {isEditing && <View style={styles.delete} ><IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={onDelete} /></View>}
      </View>
}

const styles = StyleSheet.create({
  form: {
    marginTop: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: 'center'
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: "center"
  }, 
  rowInput: {
    flex: 1
  },
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