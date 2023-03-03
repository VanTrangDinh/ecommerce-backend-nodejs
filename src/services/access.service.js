'use strict';

const shopModel = require('../models/shop.model');
const bcrypt = require('bcrypt'); //hash password
const crypto = require('crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');
// ROLESHOP: ĐƯỢC KÍ HIỆU BẰNG '0001' CHỨ K GHI SẴN RA NHƯ VẬY, ĐỂ TRONG ENV
const RolesShop = {
  SHOP: 'SHOP',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN',
};

class AccessService {
  //viết static khoe hơn, vì làm việc với model, service nên k cần phải new, chỉ cần gọi package chấm một phát ra function luôn
  static signUp = async ({ name, email, password }) => {
    try {
      //step1: check email exits??
      const holderShop = await shopModel
        .findOne({ email })
        .lean();
      if (holderShop) {
        return {
          code: 'xxx',
          message: 'Shop already registered',
        };
      }

      //nếu chưa đk
      const passwordHash = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RolesShop.SHOP],
      });
      // sau khi tạo xong shoper: >>> tạo token(accesstoken, refreshtoken) >> dùng thuật toán bất đối xứng >>NHỚ GHI DÔ DOCS
      if (newShop) {
        //create publicKey, privateKey: sử dụng thuật toán bất đối xứng
        // const { privateKey, publicKey } =
        //   crypto.generateKeyPairSync('rsa', { //rsa k lưu trực tiếp vao database, phải chuyển sang hash string để lưu vào database,
        //     // nếu lấu publicKey từ database phải chuyển về rsa lại
        //     modulusLength: 4096,
        //     publicKeyEncoding: {// tìm hiểu thêm mấy cái public key cryptography standards
        //         type: 'pkcs1', //pkcs8
        //         format: 'pem'
        //     },
        //     privateKeyEncoding: {
        //         type: 'pkcs1',
        //         format: 'pem',
                
        //     }
        //   }); // 'rsa' thông số

        //Dùng thuật toán đơn giản hơn::::::
        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')
          
          console.log({ privateKey, publicKey });
        // save publicKey vao collection Keystore
        const keyStore =
          await KeyTokenService.createKeyToken({
            userId: newShop._id,
            publicKey,
            privateKey
          });

        if (!keyStore) {
          return {
            code: 'xxxx',
            message: 'keyStore error',
          };
        }
        // chuyen 
        // console.log(`PublicKeString::`, publicKeyString)
        // const publicKeyObject = crypto.createPublicKey(publicKeyString)
        //neu thanh cong thi tao cap token
        //created token pair
        const tokens = await createTokenPair(
          { userId: newShop._id, email },
          publicKey,
          privateKey
        );
        console.log(`Created Token Success:::`, tokens);

        return {
          code: 201,
          metadata: {
            shop: getInfoData({fileds: ['_id', 'name', 'email'], object: newShop}), // function custome o utils khi dung lodash
            tokens,
          },
        };

        //const tokens = await >>> tao trong auth
      }
      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      return {
        code: 'xxx',
        message: error.message,
        status: 'error',
      };
    }
  };
}

module.exports = AccessService;
