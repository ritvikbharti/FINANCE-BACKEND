import Record from "../models/Record.js";
import { sendResponse } from "../utils/response.js";

export const getSummary = async (req, res) => {
  const records = await Record.find();

  let totalIncome = 0;
  let totalExpense = 0;

  records.forEach((r) => {
    if (r.type === "income") totalIncome += r.amount;
    if (r.type === "expense") totalExpense += r.amount;
  });

  const netBalance = totalIncome - totalExpense;

  return sendResponse(res, 200, true, "Dashboard summary fetched", {
    totalIncome,
    totalExpense,
    netBalance
  });
};

export const getCategoryTotals = async (req, res) => {
  const result = await Record.aggregate([
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" }
      }
    },
    { $sort: { total: -1 } }
  ]);

  return sendResponse(res, 200, true, "Category totals fetched", result);
};

export const getRecentActivity = async (req, res) => {
  const recent = await Record.find().sort({ createdAt: -1 }).limit(5);

  return sendResponse(res, 200, true, "Recent activity fetched", recent);
};

export const getMonthlyTrends = async (req, res) => {
  const trends = await Record.aggregate([
    {
      $group: {
        _id: { $month: "$date" },
        income: {
          $sum: {
            $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
          }
        },
        expense: {
          $sum: {
            $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
          }
        }
      }
    },
    { $sort: { "_id": 1 } }
  ]);

  return sendResponse(res, 200, true, "Monthly trends fetched", trends);
};