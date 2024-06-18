const express = require('express')
const router = express.Router()
const {Auth} = require('../../controllers')

router.post('/login', Auth.LoginController.login)
router.post('/register', Auth.RegisterController.register)

module.exports = router;