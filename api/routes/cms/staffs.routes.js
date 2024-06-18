const { StaffsController } = require('../../controllers/cms')
const staffsController = require('../../controllers/cms/staffs.controller')
const express = require('express')

const router = express.Router()

router.route('/')
    .get(StaffsController.index)
    .post(staffsController.store)

router.route('/:id')
    .get(staffsController.show)
    .patch(staffsController.update)
    .put(staffsController.update)
    .delete(staffsController.delete)

module.exports = router