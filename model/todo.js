const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

const Todo = mongoose.model("todo", toDoSchema);
module.exports = Todo;