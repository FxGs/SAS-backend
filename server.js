const express = require("express")
const cors = require("cors")
const supermarkets = require("./api/supermarkets.route.js")
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/supermarkets/", supermarkets)

app.use("*", (req,res)=> {
    res.status(404).json({
        error: "Not Found"
    })
})

module.exports = app
