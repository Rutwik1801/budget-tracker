import {  StyleSheet, Text, View } from "react-native"
import { Input } from "./Input"
import { GlobalStyles } from "../../constants/styles"
import { useContext, useState } from "react"
import { ExpensesContext } from "../../store/expenses-context"
import { IconButton } from "../UI/IconButton"
import { Button } from "../UI/Button"
import { getFormattedDate } from "../../utils/date"
import { CategorySelect } from "./CategorySelect"

type ExpenseFormProps = {
  onSubmit: (expenseObject: any) => void,
  onCancel: () => void,
  editedExpenseId: string,
  onDelete: () => void
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({onSubmit, onCancel, editedExpenseId, onDelete}) => {
  const expensesCtx = useContext(ExpensesContext)
    const isEditing = !!editedExpenseId;
    let editedExpense;
    if(isEditing) {
      const temp = expensesCtx.expenses.find(item => item.id === editedExpenseId)
      if(temp) {
        editedExpense = temp;
      }
    }
  const [expense, setExpense] = useState({
    amount: {value: isEditing ? editedExpense?.amount: editedExpense?.amount, isValid: true},
    description: {value: editedExpense?.description, isValid: true},
    date: {value: isEditing ? (editedExpense?.date ? getFormattedDate(editedExpense?.date) : new Date()): editedExpense?.date, isValid: true},
    category: {value: isEditing ? editedExpense?.category: {label: "Others", value: "airplane-outline"}, isValid: true}
  })
  const handleSubmit = () => {
    const amountIsValid = !isNaN(expense?.amount.value as number) && (expense?.amount.value as number) > 0;
    const dateIsValid = new Date((expense?.date.value) as Date).toString() !== "Invalid Date";
    const descriptionIsValid = (expense?.description?.value as string)?.trim()?.length > 0;
    if(!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setExpense(prev => ({
        amount: {value: prev.amount.value, isValid: amountIsValid},
        description: {value: prev.description.value, isValid: descriptionIsValid},
        date: {value: prev.date.value, isValid: dateIsValid},
        category: {value: prev.category.value, isValid: true}
      }))
      return;
    }
    const expenseObject = {
      amount: expense.amount.value,
      date: expense.date.value,
      description: expense.description.value,
      category: expense.category.value
    }
    onSubmit(expenseObject)
  }

  const handleInputChange = (inputIdentifier: string, enteredValue: any) => {
    setExpense((prev) => (
      {...prev, [inputIdentifier]: {...prev[inputIdentifier], value: enteredValue}}))
  }
  return <View style={styles.form}>
    <Text style={styles.title} >Your Expense</Text>
    <CategorySelect onChange={handleInputChange.bind(this, "category")} defaultCategory={expense.category.value}/>
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
    color: GlobalStyles.colors.primary50,
    marginVertical: 24,
    textAlign: 'center'
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "stretch"
  }, 
  rowInput: {
    flex: 1,
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