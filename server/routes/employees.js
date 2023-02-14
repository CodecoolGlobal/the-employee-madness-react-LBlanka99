const express = require("express");
const router = express.Router();
const EmployeeModel = require("../db/employee.model");


router.get("/", async (req, res) => {
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 10;

  console.log(page, limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < await EmployeeModel.countDocuments()) {
    results.next = {
      page: page + 1,
      limit: limit
    }
  } else {
    results.next = {
      page: null,
      limit: limit
    }
  }

  if (startIndex > 0) {
    results.prev = {
      page: page - 1,
      limit: limit
    }
  } else {
    results.prev = {
      page: null,
      limit: limit
    }
  }

  const employees = await EmployeeModel.find().limit(limit).skip(startIndex).sort({ created: "desc" });
  results.results = employees;
  return res.json(results);
});


router.use("/:id", async (req, res, next) => {
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
  
  
  router.get("/:id", (req, res) => {
    return res.json(req.employee);
  });
  
  router.post("/", async (req, res, next) => {
    const employee = req.body;
  
    try {
      const saved = await EmployeeModel.create(employee);
      return res.json(saved);
    } catch (err) {
      return next(err);
    }
  });
  
  router.patch("/:id", async (req, res, next) => {
    const employee = req.body;
   
    try {
      const updated = await req.employee.set(employee).save();
      return res.json(updated);
    } catch (err) {
      return next(err);
    }
  });
  
  router.delete("/:id", async (req, res, next) => {
    try {
      const deleted = await req.employee.delete();
      return res.json(deleted);
    } catch (err) {
      return next(err);
    }
  });


module.exports = router;