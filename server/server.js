require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const boardGamesModel = require("./db/boardGames.model");
const EmployeeModel = require("./db/employee.model");

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();

app.use(express.json());

app.use("/api/employees/:id", async (req, res, next) => {
  let employee = null;

  try {
    employee = await EmployeeModel.findById(req.params.id);
  } catch (err) {
    return next(err);
  }

  if (!employee) {
    return res.status(404).end("Employee not found");
  }

  req.employee = employee;
  next();
});

app.get("/api/employees/", async (req, res) => {
  const employees = await EmployeeModel.find().populate("favGame");
  return res.json(employees);
});

app.get("/api/employees/:id", (req, res) => {
  return res.json(req.employee);
});

app.get("/api/boardGames/", async (req, res) => {
  const games = await boardGamesModel.find();
  return res.json(games);
})

app.get("/api/boardGames/:id", async (req, res) => {
  const game = await boardGamesModel.find({_id: req.params.id});
})

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.post("/api/boardGames/", async (req, res) => {
  const saved = await boardGamesModel.create(req.body);
  return res.json(saved);
})

app.patch("/api/employees/:id", async (req, res, next) => {
  const employee = req.body;

  try {
    const updated = await req.employee.set(employee).save();
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const deleted = await req.employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/employees route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
