import Record from "../models/Record.js";
import { sendResponse } from "../utils/response.js";

export const createRecord = async (req, res) => {
  const { amount, type, category, date, notes } = req.body;

  if (!amount || !type || !category || !date) {
    return sendResponse(res, 400, false, "Missing required fields");
  }

  if (!["income", "expense"].includes(type)) {
    return sendResponse(res, 400, false, "Invalid record type");
  }

  const record = await Record.create({
    amount,
    type,
    category,
    date,
    notes,
    createdBy: req.user._id
  });

  return sendResponse(res, 201, true, "Record created", record);
};

export const getRecords = async (req, res) => {
  const { type, category, startDate, endDate } = req.query;

  let filter = {};

  if (type) filter.type = type;
  if (category) filter.category = category;

  if (startDate && endDate) {
    filter.date = {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    };
  }

  const records = await Record.find(filter).sort({ date: -1 });

  return sendResponse(res, 200, true, "Records fetched", records);
};

export const getSingleRecord = async (req, res) => {
  const record = await Record.findById(req.params.id);

  if (!record) {
    return sendResponse(res, 404, false, "Record not found");
  }

  return sendResponse(res, 200, true, "Record fetched", record);
};

export const updateRecord = async (req, res) => {
  const record = await Record.findById(req.params.id);

  if (!record) {
    return sendResponse(res, 404, false, "Record not found");
  }

  const { amount, type, category, date, notes } = req.body;

  if (type && !["income", "expense"].includes(type)) {
    return sendResponse(res, 400, false, "Invalid record type");
  }

  record.amount = amount ?? record.amount;
  record.type = type ?? record.type;
  record.category = category ?? record.category;
  record.date = date ?? record.date;
  record.notes = notes ?? record.notes;

  await record.save();

  return sendResponse(res, 200, true, "Record updated", record);
};

export const deleteRecord = async (req, res) => {
  const record = await Record.findById(req.params.id);

  if (!record) {
    return sendResponse(res, 404, false, "Record not found");
  }

  await record.deleteOne();

  return sendResponse(res, 200, true, "Record deleted");
};