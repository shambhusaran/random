const { CustomerController } = require('../../controllers/cms')

const express = require('express')

const router = express.Router()

router.route('/')
    .get(CustomerController.index)
    .post(CustomerController.store)

router.route('/:id')
    .get(CustomerController.show)
    .patch(CustomerController.update)
    .put(CustomerController.update)
    .delete(CustomerController.delete)

module.exports = router