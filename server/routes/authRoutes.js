const express = require('express')
const router = express.Router()
const {createOrUpdateUser} = require('../controllers/auth')
const {authValidate} = require('../middlewares/auth')

//route

router.post("/create",authValidate,createOrUpdateUser)

module.exports= router