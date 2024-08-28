const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Budget = require("../models/budgetModel");
require("dotenv").config();

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.User = await User.findOne({ _id }).select("_id");
    next();
  } catch(error) {
    console.log(error);
    res.status(400).json({ error: "Request is not authorized" });
  }
};

const allbudgets = async (req, res) => {
    const { user_id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(404).json({ error: "user does not exist !!!" });
    }
  
    try {
      const budgets = await Budget.find({ user_id:user_id });
      res.status(200).json(budgets);
    } catch (error) {
      res.status(400).json(error.message);
    }
};

const createbudget = async (req,res)=>{
    const { user_id,Name,amount } = req.body;
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(404).json({ error: "user does not exist !!!" });
      }
      try {
        const budget = await Budget.create({user_id,Name,amount});
        res.status(200).json(budget);
      } catch (error) {
        res.status(400).json(error.message);
      }
}

const editbudget = async (req,res)=>{
    const { user_id,Name,amount,_id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(404).json({ error: "user does not exist !!!" });
      }
      try {
        const budget = await Budget.findByIdAndUpdate({_id},{Name,amount});
        await budget.save()
        res.status(200).json(budget);
      } catch (error) {
        res.status(400).json(error.message);
      }
}

const deletebudget = async (req,res)=>{
    const { _id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({ error: "Budget does not exist !!!" });
      }
      try {
        const budget = await Budget.findByIdAndDelete(_id)
        res.status(200).json("Deleted Successfully");
      } catch (error) {
        res.status(400).json(error.message);
      }
}

const createExpense = async(req,res) => {
  const { _id,Name,amount } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({ error: "Budget does not exist !!!" });
    }
    try {
      const budget = await Budget.findById(_id);
      if (!budget) {
        return res.status(404).json({ error: "Budget not found" });
      }
      const newExpense = {
        Name: Name,
        Amount: amount,
        createdAt: new Date(), // Automatically sets the date of creation
      };
      budget.expenses.push(newExpense);
      await budget.save();
      res.status(200).json(budget.expenses)
    } catch (error) {
      res.status(400).json(error.message);
    }
}

const deleteExpense = async(req,res) => {
  const { _id, expense_id } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({ error: "Budget does not exist !!!" });
    }
    try {
      const budget = await Budget.findById(_id);
      if (!budget) {
        return res.status(404).json({ error: "Budget not found" });
      }
      
      budget.expenses = budget.expenses.filter((item)=> item._id != expense_id)
      await budget.save();
      res.status(200).json(budget.expenses)
    } catch (error) {
      res.status(400).json(error.message);
    }
}

const router = express.Router();

router.use(requireAuth);

router.post("/", allbudgets);
router.post("/create", createbudget);
router.patch("/edit", editbudget);
router.post("/delete", deletebudget);
router.post("/createExpense", createExpense);
router.delete("/deleteExpense", deleteExpense);

module.exports = router;