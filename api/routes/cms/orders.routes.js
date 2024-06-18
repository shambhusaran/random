const { Cms } = require('../../controllers')


const express = require('express')

const router = express.Router()

router.get('/', Cms.OrdersController.index)

router.delete( '/:id', Cms.OrdersController.destroy)
router.patch( '/:id', Cms.OrdersController.update)
router.put( '/:id', Cms.OrdersController.update)

module.exports = router