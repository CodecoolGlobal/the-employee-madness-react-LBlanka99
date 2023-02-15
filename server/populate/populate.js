/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const EmployeeModel = require("../db/employee.model");
const kittenNames = require("./kittens.json");
const kittenModel = require("../db/kitten.model");

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

const populateKittens = async () => {
  await kittenModel.deleteMany();

  const employees = await EmployeeModel.find();
  const kittens = employees.map((employee) => ({
    name: pick(kittenNames),
    weight: Math.floor(Math.random() * 7),
    employee: employee
  }));

  await kittenModel.create(...kittens);
  
}

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEmployees();
  await populateKittens();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
