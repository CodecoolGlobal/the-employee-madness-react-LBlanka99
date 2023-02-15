const mongoose = require("mongoose");

const {Schema} = mongoose;

const ToolsSchema = new Schema({
    name: String,
    weight: Number
});

module.exports = mongoose.model("Tool", ToolsSchema);
