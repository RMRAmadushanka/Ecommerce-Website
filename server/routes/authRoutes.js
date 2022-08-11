const express = require('express')
const router = express.Router()
const {createOrUpdateUser,currentUser} = require('../controllers/auth')
const {authValidate} = require('../middlewares/auth')

//route

router.post("/create",authValidate,createOrUpdateUser)
router.post("/currentUser",authValidate,currentUser)

module.exports= router