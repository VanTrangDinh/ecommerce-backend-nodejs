'use strict'

const express = require('express')
const {apiKey, permission} = require('../auth/checkAuth')
const router = express.Router()

//check APIkey: xác định api có sài verion của chúng ta hay không
// router.use(apiKey) // kiem tra key, hop le cho vao
// //check permision: kiểm tra key có được quyền truy cập  backend hay không
// router.use(permission('0000')) //'0000' là chung, duy nhất
//check permission(admin. user...) > hop le cho vao

//check Apikey: xác định api có sài verion của chúng ta hay không
router.use(apiKey)

//nếu hợp lệ, tiếp tục check permission (quyen truy cap)
router.use(permission('0000'))

router.use('/v1/api', require('./access'))
// router.get('', (req, res, next) => {
//     return res.status(200).json({
//         message: 'Welcome!!!'
//     })
// })

module.exports = router