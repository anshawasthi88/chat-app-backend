const userRoutes = require("./routes/userRoutes")
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")


const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes);

mongoose.connect(process.env.MONGO_URL,{
}).then(() => {
    console.log("Db connection Sucessfull")
}).catch((err) => {
    console.log(err.message)
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started at PORT ${process.env.PORT}`)
})

