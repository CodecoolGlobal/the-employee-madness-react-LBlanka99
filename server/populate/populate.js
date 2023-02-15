/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const EmployeeModel = require("../db/employee.model");
const ToolModel = require("../db/tools.model")

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const populateTools = async () => {
  await ToolModel.deleteMany();

  await ToolModel.insertMany([{ "name": "Notebook", "weight": 0.5 },
  { "name": "Pencil", "weight": 0.06 },
  { "name": "Pen", "weight": 0.12 },
  { "name": "Book", "weight": 1 }]
  )
}

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEmployees();

  await populateTools();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
