const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createInventoryController, getInventoryController } = require('../controllers/inventoryController')

const router = express.Router()

//routes
//add inventory || POST
router.post('/create-inventory',authMiddleware, createInventoryController)

//get all blood recors || GET
router.get('/get-inventory',authMiddleware,getInventoryController)

module.exports = router