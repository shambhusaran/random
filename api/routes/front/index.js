const express = require('express')

const router = express.Router()
const ProductRoutes = require('./product.routes.js')
const MiscRoutes = require('./misc.routes.js')
const { Product } = require('../../models')
router.use('/products', ProductRoutes )
router.use(MiscRoutes)


router.get('/image/:filename', (req, resp, next)=>{

    resp.sendFile(`uploads/${req.params.filename}`,{
        'root': './'
    })
    
})

module.exports = router