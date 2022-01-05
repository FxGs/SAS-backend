const app = require("./server.js")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const port = process.env.PORT || 8000

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
    console.log("Connected to mongoDB successfully")
})
mongoose.connection.on('error', (err) => {
    console.log("err connecting", err)
})

app.listen(port, () => {
    console.log("Server is running on", port)
})