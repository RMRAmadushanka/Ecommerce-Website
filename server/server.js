const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const {readdirSync} = require("fs")

//routes import

const authRoutes = require('./routes/authRoutes')

//app create

const app = express()

//database connection

mongoose.connect(process.env.DATABASE).then(()=>console.log("DB Connected")).catch(err=>console.log(`DB CONNECTION ERR ${err}`))


//middlewares

app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cors())

readdirSync("./routes").map((r)=>app.use("/api",require("./routes/"+r)))



//start port

const port = process.env.PORT || 8000

app.listen(port,()=>{
    console.log(`Server is runnin on port ${port}`);
})