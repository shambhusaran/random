const express = require('express')
const authRoutes = require('../routes/auth')
const profileRoutes = require('../routes/profile')
const cmsRoutes = require('./cms')
const {authorize, cmsAccess} = require('../authlib')
const frontRoutes = require('./front')

const router = express.Router()
router.use('/auth',authRoutes)
router.use('/profile', authorize,  profileRoutes)
router.use('/cms',authorize, cmsAccess,  cmsRoutes)
router.use(frontRoutes)


module.exports  = router