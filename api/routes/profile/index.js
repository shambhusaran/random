const { customerAccess } = require('../../authlib')
const Profile = require('../../controllers/profile')
const express = require('express')
const router = express.Router()
router.get('/', Profile.ProfileController.show)
router.route('/edit')
    .put(Profile.ProfileController.update)
    .patch(Profile.ProfileController.update)

    router.route('/password')
    .put(Profile.ProfileController.updatePassword)
    .patch(Profile.ProfileController.updatePassword)

    router.get('/reviews', customerAccess, Profile.ProfileController.reviews)
    
    router.get('/orders', customerAccess, Profile.ProfileController.orders)
module.exports= router