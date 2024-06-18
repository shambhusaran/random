const express = require('express')
const {Front} = require('../../controllers')
const router = express.Router()
const {authorize, customerAccess} = require('../../authlib')
router.get('/categories', Front.MiscController.categories)
router.get('/categories/:id', Front.MiscController.categoryById)
router.get('/categories/:id/products', Front.MiscController.categoryProducts)
router.get('/brands', Front.MiscController.brands)
router.get('/brands/:id', Front.MiscController.brandById)
router.get('/brands/:id/products', Front.MiscController.brandProducts)
router.post('/checkout', authorize, customerAccess, Front.MiscController.checkOut)

module.exports = router