const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Todo = require("./model/todo");
require("dotenv").config();

const app = express();

app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({ extended: false }))

app.set("view engine", "ejs")

app.get("/", async (req, res) => {
    const data = await Todo.find()
    res.render("index.ejs", { data: data })
})

app.post("/", async (req, res) => {
    console.log(req.body.name)
    await new Todo({
        name: req.body.name
    }).save();
    res.redirect("/")
})

app.get("/edit/:id", async (req, res) => {
    const todo = await Todo.findOne({ _id: req.params.id })
    console.log(todo)
    res.render("edit.ejs", { todo: todo })
})

app.post("/edit", async (req, res) => {
    console.log(req.body)
    await Todo.updateOne({ _id: req.body.id }, {
        name: req.body.name
    })
    res.redirect("/")
})

app.get("/delete/:id", async (req, res) => {
    await Todo.deleteOne({ _id: req.params.id })
    res.redirect("/")

})

mongoose.connect('mongodb+srv://peggyj:MangoMania69@cluster0.bphuo.mongodb.net/peggyDB?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) return
    app.listen(process.env.PORT || 4040, () => {
        console.log("app is running ")
    })
})