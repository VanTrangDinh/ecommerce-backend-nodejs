'use strict'

const shopModel = require('../models/shop.model')
const bcrypt = require('bcrypt') //hash password
const crypto = require('crypto')
// ROLESHOP: ĐƯỢC KÍ HIỆU BẰNG '0001' CHỨ K GHI SẴN RA NHƯ VẬY, ĐỂ TRONG ENV
const RolesShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'

}

class AccessService {
    //viết static khỏi hơn, vì làm việc với model, service nên k cần phải new, chỉ cần gọi package chấm một phát ra function luôn
    static signUp = async ({ name, email, password }) => {
        try {
            //step1: check email exits??
            const holderShop = await shopModel.findOne({ email }).lean()
            if(holderShop) {
                return {
                    code: 'xxx',
                    message: 'Shop already registered'
                }
            }

            //nếu chưa đk 
            const passwordHash = await bcrypt.hash(password, 10)
            const newShop = await shopModel.create( {
                name, email, password: passwordHash, roles: [RolesShop.SHOP]
            })
            // sau khi tạo xong shoper: >>> tạo token(accesstoken, refreshtoken) >> dùng thuật toán bất đối xứng >>NHỚ GHI DÔ DOCS
            if(newShop) {
                //create publicKey, privateKey
                const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {modulusLength: 4096})
                // save  collection Keystore
                console.log({privateKey, publicKey})
            }

        } catch (error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService 