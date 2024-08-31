export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

// colors
const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${(existingBudgetLength + 1) * 34} 65% 50%`;
};

// Local storage
export const fetchData = (key) => {
  return JSON.parse(sessionStorage.getItem(key));
};

// Get all items from local storage
export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};

// delete item from local storage
export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return sessionStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

// create budget
export const createBudget = async({ name, amount }) => {
  const User = JSON.parse(sessionStorage.getItem("User"))
  const response = await fetch(`http://localhost:4000/expense/create`, {
    method: "POST",
    headers: { "Content-type": "application/json" ,
      Authorization: `Bearer ${User.token}`,
    },
    body: JSON.stringify({ user_id: User.user._id, Name:name,amount:amount }),
  });
  
  const json = await response.json();
  if(response.ok){
    const newItem = {
      _id: json._id,
      Name: json.Name,
      amount: +json.amount,
      color: generateRandomColor(),
      expenses : []
    };
    console.log(json)
    const existingBudgets = fetchData("budgets") ?? [];
    return sessionStorage.setItem(
      "budgets",
      JSON.stringify([...existingBudgets, newItem])
    );
  }else if(!response.ok){
    toast.error(json.error);
  }
};

// create expense
export const createExpense = async({ name, amount, budgetId }) => {

  const User = JSON.parse(sessionStorage.getItem("User"))
  const response = await fetch(`http://localhost:4000/expense/createExpense`, {
    method: "POST",
    headers: { "Content-type": "application/json" ,
      Authorization: `Bearer ${User.token}`,
    },
    body: JSON.stringify({ _id: budgetId, Name:name,amount:amount }),
  });
  
  const json = await response.json();
  if(response.ok){
    const newItem = {
      _id: json._id,
      Name: json.Name,
      createdAt: Date.now(),
      amount: +json.Amount,
      budgetId: budgetId,
    };
    const existingExpenses = fetchData("expenses") ?? [];
    return sessionStorage.setItem(
      "expenses",
      JSON.stringify([...existingExpenses, newItem])
    );
  }else if(!response.ok){
    toast.error(json.error);
  }
};

// total spent by budget
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    // check if expense.id === budgetId I passed in
    if (expense.budgetId !== budgetId) return acc;

    // add the current amount to my total
    return (acc += expense.Amount);
  }, 0);
  return budgetSpent;
};

// FORMATTING
export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleDateString();

// Formating percentages
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

// Format currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "INR",
  });
};

