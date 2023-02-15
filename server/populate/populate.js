/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const EmployeeModel = require("../db/employee.model");
const colors = require("./colors.json");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const getRandomDate = () => {
  const maxDate = Date.now();
  const timestamp = Math.floor(Math.random() * maxDate);
  return new Date(timestamp);
}

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});

  const employees = names.map((name) => {
    const currentSalary = Math.floor(Math.random() * (200000 - 60000) + 60000);

    return {
    name,
    level: pick(levels),
    position: pick(positions),
    startingDate: getRandomDate(),
    currentSalary: currentSalary,
    favColor: pick(colors),
    desiredSalary: currentSalary + Math.floor(Math.random() * 1800)}
  });

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
