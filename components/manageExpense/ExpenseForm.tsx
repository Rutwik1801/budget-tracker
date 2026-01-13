import { useContext, useState } from "react"
import { Input } from "./Input"
import { ExpensesContext } from "../../store/expenses-context"
import { IconButton } from "../UI/IconButton"
import { Button } from "../UI/Button"
import { CategorySelect } from "./CategorySelect"
import DateTimePicker, { useDefaultStyles } from "react-native-ui-datepicker"
import { ScrollView, View, Text } from "../base"

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
      amount: parseFloat(String(expense.amount.value || "0"))?.toFixed(2),
      date: expense.date.value,
      description: expense.description.value,
      category: expense.category.value,
      transactionType: expense.transactionType.value
    }
    onSubmit(expenseObject)
  }

  const handleInputChange = (inputIdentifier: string, enteredValue: any) => {
    setExpense((prev: any) => ({
      ...prev,
      [inputIdentifier]: {
        ...prev[inputIdentifier],
        value: inputIdentifier === "date" ? new Date(enteredValue.date) : enteredValue,
      },
    }));
  };

  return (
    <ScrollView className="mt-2" showsVerticalScrollIndicator={false}>
      <Input
        textInputConfig={{
          onChangeText: (value: string) => handleInputChange("description", value),
          value: expense.description.value
        }}
        style={{ marginTop: 0 }}
        textInputStyle={{ borderWidth: 0, fontSize: 35, fontWeight: "bold", letterSpacing: 2 }}
        placeholder="Description"
        invalid={!expense.description.isValid}
      />
      <Input
        style={{ flex: 1 }}
        textInputConfig={{
          keyboardType: "decimal-pad",
          onChangeText: (value: string) => handleInputChange("amount", value),
          value: expense.amount.value?.toString()
        }}
        textInputStyle={{ paddingBottom: 10, borderWidth: 0, fontSize: 25, fontWeight: "bold", letterSpacing: 2, borderBottomWidth: 1, borderColor: "#ccc" }}
        placeholder="$ Amount"
        invalid={!expense.amount.isValid}
      />
      <Text className="text-gray-600 text-2xl">Transaction type</Text>
      <View className="flex-row justify-around items-center my-2">
        <Button
          containerClassName={`rounded-2xl px-4 py-1 ${expense.transactionType.value === "Expense" ? 'bg-red-500' : 'bg-gray-200'}`}
          onPress={() => handleInputChange("transactionType", "Expense")}
        >
          Expense
        </Button>
        <Button
          containerClassName={`rounded-2xl px-4 py-1 ${expense.transactionType.value === "Income" ? 'bg-green-500' : 'bg-gray-200'}`}
          onPress={() => handleInputChange("transactionType", "Income")}
        >
          Income
        </Button>
      </View>
      <Text className="text-gray-600 text-2xl mb-2">Date</Text>
      <DateTimePicker
        mode="single"
        date={expense.date.value}
        onChange={(date) => date && handleInputChange("date", date)}
        styles={useDefaultStyles()}
      />
      <Text className="text-gray-600 text-2xl mb-4 mt-7">Select A Category</Text>
      <CategorySelect onChange={(value: any) => handleInputChange("category", value)} defaultCategory={expense.category.value} />
      <Button containerClassName="min-w-[120px] mx-2 mb-2" onPress={handleSubmit}>
        {isEditing ? "Update" : "Add"}
      </Button>
      <Button containerClassName="min-w-[120px] mx-2 mb-2" mode="flat" onPress={onCancel}>
        Cancel
      </Button>
      {isEditing && (
        <View className="mt-4 pt-2 border-t-2 border-gray-600 items-center">
          <IconButton icon="trash" color="#d64060" size={36} onPress={onDelete} />
        </View>
      )}
    </ScrollView>
  )
}