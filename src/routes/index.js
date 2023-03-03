'use strict'

const express = require('express')
const {apiKey, permission} = require('../auth/checkAuth')
const router = express.Router()

//check APIkey: xác định api có sài verion của chúng ta hay không
router.use(apiKey)
//check permision: kiểm tra key có được quyền truy cập  backend hay không
router.use(permission('0000')) //'0000' là chung, duy nhất

router.use('/v1/api', require('./access'))




// router.get('', (req, res, next) => {
//     return res.status(200).json({
//         message: 'Welcome!!!'
//     })
// })

module.exports = router