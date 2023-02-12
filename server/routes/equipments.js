const express = require("express");
const equipmentModel = require("../db/equipment.model");
const router = express.Router();


router.use("/:id", async (req, res, next) => {
    let equipment = null;
  
    try {
      equipment = await equipmentModel.findById(req.params.id);
    } catch (err) {
      return next(err);
    }
  
    if (!equipment) {
      return res.status(404).end("equipment not found");
    }
  
    req.equipment = equipment;
    next();
  });
  
  router.get("/", async (req, res) => {
    const equipments = await equipmentModel.find().sort({ created: "desc" });
    return res.json(equipments);
  });
  
  
  router.get("/:id", (req, res) => {
    return res.json(req.equipment);
  });
  
  router.post("/", async (req, res, next) => {
    const equipment = req.body;
  
    try {
      const saved = await equipmentModel.create(equipment);
      return res.json(saved);
    } catch (err) {
      return next(err);
    }
  });
  
  router.patch("/:id", async (req, res, next) => {
    const equipment = req.body;
   
    try {
      const updated = await req.equipment.set(equipment).save();
      return res.json(updated);
    } catch (err) {
      return next(err);
    }
  });
  
  router.delete("/:id", async (req, res, next) => {
    try {
      const deleted = await req.equipment.delete();
      return res.json(deleted);
    } catch (err) {
      return next(err);
    }
  });


module.exports = router;