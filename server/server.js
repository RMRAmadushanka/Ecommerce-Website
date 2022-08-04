const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

//app create

const app = express()

//database connection

mongoose.connect(process.env.DATABASE).then(()=>console.log("DB Connected")).catch(err=>console.log(`DB CONNECTION ERR ${err}`))


//middlewares

app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(express)