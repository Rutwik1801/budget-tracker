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
    amount: {value: isEditing ? editedExpense.amount.toString(): editedExpense.amount, isValid: true},
    description: {value: editedExpense.description, isValid: true},
    date: {value: isEditing ? getFormattedDate(editedExpense.date): editedExpense.date, isValid: true}
  })
  const handleSubmit = () => {
    const amountIsValid = !isNaN(expense.amount.value) && expense.amount.value > 0;
    const dateIsValid = new Date(expense.date.value).toString() !== "Invalid Date";
    const descriptionIsValid = expense.description.value.trim().length > 0;
    if(!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setExpense(prev => ({
        amount: {value: prev.amount.value, isValid: amountIsValid},
        description: {value: prev.description.value, isValid: descriptionIsValid},
        date: {value: prev.date.value, isValid: dateIsValid}
      }))
      return;
    }
    const expenseObject = {
      amount: expense.amount.value,
      date: expense.date.value,
      description: expense.description.value,
    }
    onSubmit(expenseObject)
  }

  const handleInputChange = (inputIdentifier, enteredValue) => {
    setExpense((prev) => (
      {...prev, [inputIdentifier]: {...prev[inputIdentifier], value: enteredValue}}))
  }
  return <View style={styles.form}>
    <Text style={styles.title} >Your Expense</Text>
    <View style={styles.inputsRow}>
    <Input style= {styles.rowInput} label="Amount" textInputConfig={{
      keyboardType: "decimal-pad",
      onChangeText: handleInputChange.bind(this, "amount"),
      value: expense.amount.value
    }} 
    invalid={!expense.amount.isValid}
    />
    <Input style={styles.rowInput} label="Date" textInputConfig={{
      placeholder: 'YYYY-MM-DD',
      maxlength:10,
      onChangeText: handleInputChange.bind(this, "date"),
      value: expense.date.value
    }} 
    invalid={!expense.date.isValid}
    />
    </View>
    <Input label="Description" textInputConfig={{
      multiline: true,
      onChangeText: handleInputChange.bind(this, "description"),
      value: expense.description.value
    }}
    invalid={!expense.description.isValid}
    />
        <View style={styles.buttonContainer}>
          <Button buttonContainerStyle={styles.button} mode="flat" onPress={onCancel} >Cancel</Button>
          <Button buttonContainerStyle={styles.button} onPress={handleSubmit} >{isEditing ? "Update" : "Add"}</Button>
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
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8
  }
})