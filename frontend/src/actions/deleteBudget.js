// rrd import
import { redirect } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helpers
import { getAllMatchingItems,fetchData } from "../helpers";

const handledelete = async(id) =>{
  const existingData = fetchData("budgets");
  const User = JSON.parse(sessionStorage.getItem("User"));
  const response = await fetch(
    `/api/expense/delete`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${User.token}`,
      },
      body: JSON.stringify({
        _id: id,
      }),
    }
  );
  const json = await response.json();
  if(response.ok){
    const newData = existingData.filter((item) => item._id !== id);
    sessionStorage.setItem("budgets", JSON.stringify(newData));
  }else{
    console.log(response.error)
  }
}

export async function deleteBudget({ params }) {
  try {
    await handledelete(params.id);
    const existingData = fetchData("expenses");
    const newData = existingData.filter((item) => item.budgetId !== params.id);
    sessionStorage.setItem("expenses", JSON.stringify(newData));
    window.location.href = '/';
    toast.success("Budget deleted successfully!");
  } catch (e) {
    throw new Error("There was a problem deleting your budget.");
  }
}
