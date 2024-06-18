const { BrandController } = require('../../controllers/cms')


const express = require('express')

const router = express.Router()

router.route('/')
    .get(BrandController.index)
    .post(BrandController.store)

router.route('/:id')
    .get(BrandController.show)
    .patch(BrandController.update)
    .put(BrandController.update)
    .delete(BrandController.delete)

module.exports = router