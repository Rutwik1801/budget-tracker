import axios from "axios"

// const BACKEND_URL = ""
// const SIGNUP_URL = ""
// const LOGIN_URL = ""

export const addExpense = async (token, userId, expenseData) => {
const res = axios.post(`${BACKEND_URL}/expenses/${userId}.json?auth=${token}`, expenseData);
const id = (await res).data.name;
return id;
}

export const updateExpense = (token, userId, id, expenseData) => {
  return axios.put(`${BACKEND_URL}/${userId}/${id}.json?auth=${token}`, expenseData)
  }

  export const deleteExpense = (token, userId, id) => {
    return axios.delete(`${BACKEND_URL}/${userId}/${id}.json?auth=${token}`)
  }

export const getAllExpenses = async (token, userId) => {
  const res = await axios.get(`${BACKEND_URL}/${userId}.json?auth=${token}`)
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