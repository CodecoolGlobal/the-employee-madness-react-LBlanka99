const mongoose = require("mongoose");

const {Schema} = mongoose;

const Employee = require("./employee.model");

const KittenSchema = new Schema({
    name: String,
    weight: Number,
    employee: mongoose.SchemaTypes.ObjectId,
    /*employee: {
        type: Schema.Types.ObjectId,
        ref: "Employee"
    }*/
});

module.exports = mongoose.model("Kitten", KittenSchema);
