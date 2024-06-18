const { Cms } = require('../../controllers')


const express = require('express')

const router = express.Router()

router.get('/', Cms.ReviewsController.index)

router.delete( '/:id', Cms.ReviewsController.destroy)

module.exports = router