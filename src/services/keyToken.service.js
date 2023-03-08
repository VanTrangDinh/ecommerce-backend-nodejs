'use strict';

const keyTokenModel = require('../models/keyToken.model');

class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
  }) => {
    //    try {
    // const publicKeyString = publicKey.toString()
    //publickey được sinh ra
    //bởi thuật toán bất đối xứng cho nên nó là buffer chưa được heap,
    // nên phải chuyển về toString để lưu vô database chứng k bị lỗi
    const tokens = await keyTokenModel.create({
      user: userId,
      publicKey,
      privateKey,
    });

    return tokens ? publicKeyString : null;
    //    } catch (error) {
    //     return error
    //    }
  };
}

module.exports = KeyTokenService;
