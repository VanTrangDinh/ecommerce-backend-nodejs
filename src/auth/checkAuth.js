'use strict';

const { findById } = require('../services/apikey.service');

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization',
};
const apiKey = async (req, res, next) => {
  try {
    //get key of header
    const key = req.headers[HEADER.API_KEY]?.toString();
    console.log(key);
    if (!key) {
      return res.status(403).json({
        message: 'Forbidden Error',
      });
    }

    //check apikey exists database
    const objKey = await findById(key); //findById() tao tai service, tìm ở model, return objKey
    if (!objKey) {
      return res.status(403).json({
        message: 'Forbidden Error',
      });
    }

    req.objKey = objKey; // lấy được key rồi thì ta check permission
    return next(); //Trong expressj, next() dùng để nhảy tới rout tiếp theo mà match với url khi clien request.
    // cụ thể nó sẽ nhảy tới route permission
  } catch (error) {
    next(error);
  }
};
// check permission
// using closure

const permission = (permission) => {
  return (req, res, next) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({
        message: 'permission denied',
      });
    }
    console.log('permissions::::', req.objKey.permisions);
    const validPermission =
      req.objKey.permissions.includes(permission); // permission not 's' is parameter
    if (!validPermission) {
      return res.status(403).json({
        message: 'permission denied',
      });
    }
    // nếu không bị hai cái trên chặn lại thi sẽ nhảy tới route kế tiếp
    return next()
  };
};

module.exports = {
  apiKey,
  permission
};

// 'use strict';

// const HEADER = {
//   API_KEY: 'x-api-key',
//   AUTHORIZATION: 'authorization',
// }

// const { findById } = require('../services/apikey.service');
// const apiKey = async (req, res, next) => {
//   try {
//     const key = req.headers[HEADER.API_KEY]?.toString();
//     console.log(key)
//     if (!key) {
//       //return cho client
//       return res.status(403).json({
//         message: 'Forbidden Error',
//       });
//     }

//     //check objKey co exist database k??
//     const objKey = await findById(key);
//     if (!objKey) {
//       //retunr cho client
//       return res.status(403).json({
//         message: 'Forbidden Error',
//       });
//     }

//     req.objKey = objKey; //kem theo req de check permission
//     return next();

//   } catch (error) {

//   }

// };

// //check permissions:
// const permission = (permission) => {
//   return (req, res, next) => {
//     if(!req.objKey.permissions) {
//       return res.status(403).json({
//         message: 'permission denied'
//       })
//     }
//     //nếu có permission =>>  check coi nó có hợp lệ k
//     console.log('permisson:::+++', req.objKey.permissions)

//     const validPermission = req.objKey.permissions.includes(permission)
//     if(!validPermission) {
//       return res.status(403).json({
//         message: 'permission denied'
//       })
//     }

//     return next()
//   }
// }

// module.exports = {
//   apiKey,
//   permission
// }
