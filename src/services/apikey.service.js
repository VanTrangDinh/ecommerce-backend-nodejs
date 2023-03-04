'use strict'

const apikeyModel = require('../models/apikey.model')
const crypto = require('crypto')
const findById = async(key) => {
    //create a apikey
    const newKey = await apikeyModel.create({key: crypto.randomBytes(64).toString('hex'), permissions: ['0000']})
    console.log('newKey::::::', newKey)
    const objKey = await apikeyModel.findOne({key, status: true}).lean()
    // lean() : This makes queries faster and less memory intensive, but the result documents are plain old JavaScript objects (POJOs)
    return objKey
}

module.exports = {
    findById
}



// 'use strict'

// const apikeyModel = require("../models/apikey.model")
// const crypto = require('crypto')
// const findById = async (key) => {
//     //create a apikey:
//     const newKey = await apikeyModel.create({key: crypto.randomBytes(64).toString('hex'), permissions: ['0000']})
//     console.log(newKey)
//     const objKey = await apikeyModel.findOne({ key, status: true}).lean()
//     return objKey
// }

// module.exports = {
//     findById
// }