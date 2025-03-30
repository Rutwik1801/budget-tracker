import { ScrollView, StyleSheet, Text, View } from "react-native"
import { Input } from "./Input"
import { GlobalStyles } from "../../constants/styles"
import { useContext, useState } from "react"
import { ExpensesContext } from "../../store/expenses-context"
import { IconButton } from "../UI/IconButton"
import { Button } from "../UI/Button"
import { CategorySelect } from "./CategorySelect"
import DateTimePicker, { useDefaultStyles } from "react-native-ui-datepicker"

type ExpenseFormProps = {
  onSubmit: (expenseObject: any) => void,
  onCancel: () => void,
  editedExpenseId: string,
  onDelete: () => void
}

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit, onCancel, editedExpenseId, onDelete }) => {
  const expensesCtx = useContext(ExpensesContext)
  const isEditing = !!editedExpenseId;
  let editedExpense;
  if (isEditing) {
    const temp = expensesCtx.expenses.find(item => item.id === editedExpenseId)
    if (temp) {
      editedExpense = temp;
    }
  }

  const [expense, setExpense] = useState({
    amount: { value: isEditing ? editedExpense?.amount : editedExpense?.amount, isValid: true },
    description: { value: editedExpense?.description, isValid: true },
    date: { value: isEditing ? editedExpense?.date : new Date(), isValid: true },
    category: { value: isEditing ? editedExpense?.category : { label: "Others", value: "airplane-outline" }, isValid: true },
    transactionType: {value: isEditing ? editedExpense?.transactionType : "Expense", isValid: true}
  })

  const handleSubmit = () => {
    const amountIsValid = !isNaN(expense?.amount.value as number) && (expense?.amount.value as number) > 0;
    const dateIsValid = new Date((expense?.date.value) as Date).toString() !== "Invalid Date";
    const descriptionIsValid = (expense?.description?.value as string)?.trim()?.length > 0;
    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setExpense(prev => ({
        amount: { value: prev.amount.value, isValid: amountIsValid },
        description: { value: prev.description.value, isValid: descriptionIsValid },
        date: { value: prev.date.value, isValid: dateIsValid },
        category: { value: prev.category.value, isValid: true },
        transactionType: {value: prev.transactionType.value, isValid: true}
      }))
      return;
    }
    const expenseObject = {
      amount: parseFloat(expense.amount.value)?.toFixed(2),
      date: expense.date.value,
      description: expense.description.value,
      category: expense.category.value,
      transactionType: expense.transactionType.value
    }
    onSubmit(expenseObject)
  }

  const handleInputChange = (inputIdentifier: string, enteredValue: any) => {
    setExpense((prev) => ({
      ...prev,
      [inputIdentifier]: {
        ...prev[inputIdentifier],
        value: inputIdentifier === "date" ? new Date(enteredValue.date) : enteredValue,
      },
    }));
  };

  return <ScrollView style={styles.form} showsVerticalScrollIndicator={false} >
    <Input  textInputConfig={{
      onChangeText: handleInputChange.bind(this, "description"),
      value: expense.description.value
    }}
    style={{marginTop: 0}}
    textInputStyle={{borderWidth: 0, fontSize: 35, fontWeight: "bold", letterSpacing: 2}}
    placeholder="Description"
      invalid={!expense.description.isValid}
    />
      <Input style={styles.rowInput} textInputConfig={{
        keyboardType: "decimal-pad",
        onChangeText: handleInputChange.bind(this, "amount"),
        value: expense.amount.value?.toString() 
      }}
      textInputStyle={{paddingBottom: 10, borderWidth: 0, fontSize: 25, fontWeight: "bold", letterSpacing: 2, borderBottomWidth: 1, borderColor: "#ccc"}}

      placeholder="$ Amount"
        invalid={!expense.amount.isValid}
      />
    <Text style={{color:GlobalStyles.colors.primary200, fontSize: 24}} >Transaction type</Text>
    <View style={{flexDirection:"row", justifyContent: "space-around", alignItems:"center", marginVertical: 8}}>
            <Button buttonContainerStyle={styles.transactionButton}  onPress={() => handleInputChange("transactionType", "Expense")} >Expense</Button>
            <Button buttonContainerStyle={styles.transactionButton} onPress={() => handleInputChange("transactionType", "Income")} >Income</Button>
   
    </View>
    <Text style={{color:GlobalStyles.colors.primary200, fontSize: 24, marginBottom: 8}} >Date</Text>
    <DateTimePicker
      mode="single"
      date={expense.date.value}
      onChange={(date) => date && handleInputChange("date", date)}
      styles={useDefaultStyles()}
    />
    <Text style={{color:GlobalStyles.colors.primary200, fontSize: 24, marginBottom: 16, marginTop: 26}}>Select A Category</Text>
    <CategorySelect onChange={handleInputChange.bind(this, "category")} defaultCategory={expense.category.value} />
      <Button buttonContainerStyle={styles.button} onPress={handleSubmit} >{isEditing ? "Update" : "Add"}</Button>
      <Button buttonContainerStyle={styles.button} mode="flat" onPress={onCancel} >Cancel</Button>
    {isEditing && <View style={styles.delete} ><IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={onDelete} /></View>}
  </ScrollView>
}

const styles = StyleSheet.create({
  form: {
    marginTop: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary800,
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
    marginBottom: 8,
  },
  transactionButton: {
    backgroundColor: "#eee",
    padding: 16
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8
  }
})