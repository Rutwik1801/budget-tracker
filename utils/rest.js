import axios from "axios"

// const BACKEND_URL = ""
// const SIGNUP_URL = ""
// const LOGIN_URL = ""

export const addExpense = async (expenseData) => {
const res = axios.post(`${BACKEND_URL}/expenses.json`, expenseData);
const id = (await res).data.name;
return id;
}

export const updateExpense = (id, expenseData) => {
  return axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData)
  }

  export const deleteExpense = (id) => {
    return axios.delete(`${BACKEND_URL}/expenses/${id}.json`)
  }

export const getAllExpenses = async () => {
  const res = await axios.get(`${BACKEND_URL}/expenses.json`)
  const expenses = [];
  for (const key in res.data) {
    const expenseObj = {
      id: key,
      ...res.data[key]
    }
    expenses.push(expenseObj)
  }
  return expenses;
}

export const createUser = async (email, password) => {
    const res = await axios.post(SIGNUP_URL, {
        email,
        password,
        returnSecureToken: true
    });
    return res.data;
}


export const loginUser = async (email, password) => {
  const res = await axios.post(LOGIN_URL, {
    email,
    password,
    returnSecureToken: true
});
return res.data;
}