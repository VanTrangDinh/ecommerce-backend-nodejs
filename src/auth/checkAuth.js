'use strict';


const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization',
}

const { findById } = require('../services/apikey.service');
const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString();
    console.log(key)
    if (!key) {
      //return cho client
      return res.status(403).json({
        message: 'Forbidden Error',
      });
    }

    //check objKey co exist database k??
    const objKey = await findById(key);
    if (!objKey) {
      //retunr cho client
      return res.status(403).json({
        message: 'Forbidden Error',
      });
    }

    req.objKey = objKey; //kem theo req de check permission
    
    return next();
  } catch (error) {}

  
};


//check permissions:
const permission = (permission) => {
  return (req, res, next) => {
    if(!req.objKey.permissions) {
      return res.status(403).json({
        message: 'permission denied'
      })
    }
    //nếu có permission =>>  check coi nó có hợp lệ k
    console.log('permisson:::', req.objKey.permissions)

    const validPermission = req.objKey.permisions.includes(permission)
    if(!validPermission) {
      return res.status(403).json({
        message: 'permission denied'
      })
    }

    return next() 
  }
}


module.exports = {
  apiKey,
  permission
}
