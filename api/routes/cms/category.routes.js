const { CategoryController } = require('../../controllers/cms')


const express = require('express')

const router = express.Router()

router.route('/')
    .get(CategoryController.index)
    .post(CategoryController.store)

router.route('/:id')
    .get(CategoryController.show)
    .patch(CategoryController.update)
    .put(CategoryController.update)
    .delete(CategoryController.delete)

module.exports = router