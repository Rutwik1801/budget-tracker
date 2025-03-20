import {  StyleSheet, View } from "react-native"
import { ExpensesSummary } from "./ExpensesSummary"
import { ExpensesList } from "./ExpensesList"
import { GlobalStyles } from "../../constants/styles"

const dummyExpenses = [
  {id: 'e1',
    description: "Shoes",
    amount: 10.65,
    date: new Date('2021-08-19')
  },
  {id: 'e2',
    description: "Pant",
    amount: 14.35,
    date: new Date('2021-12-19')
  },
  {id: 'e3',
    description: "Shoes",
    amount: 103.50,
    date: new Date('2025-12-25')
  },
  {id: 'e4',
    description: "Book",
    amount: 10.65,
    date: new Date('2021-12-19')
  },
  {id: 'e11',
    description: "Shoes",
    amount: 10.65,
    date: new Date('2021-08-19')
  },
  {id: 'e21',
    description: "Pant",
    amount: 14.35,
    date: new Date('2021-12-19')
  },
  {id: 'e31',
    description: "Shoes",
    amount: 103.50,
    date: new Date('2025-12-25')
  },
  {id: 'e41',
    description: "Book",
    amount: 10.65,
    date: new Date('2021-12-19')
  },
  {id: 'e11',
    description: "Shoes",
    amount: 10.65,
    date: new Date('2021-08-19')
  },
  {id: 'e12',
    description: "Pant",
    amount: 14.35,
    date: new Date('2021-12-19')
  },
  {id: 'e13',
    description: "Shoes",
    amount: 103.50,
    date: new Date('2025-12-25')
  },
  {id: 'e14',
    description: "Book",
    amount: 10.65,
    date: new Date('2021-12-19')
  }
]

export const ExpensesOutput = ({expenses = dummyExpenses, expensesPeriod}) => {
  return <View style={styles.container}>
    <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
    <ExpensesList expenses={expenses} />
  </View>
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    padding: 24, 
    backgroundColor: GlobalStyles.colors.primary700,
    // flex: 1
  }
})