'use strict';
const AccessService = require('../services/access.service');
const { CREATED } = require('../core/success.response')
class AccessController {
  signUp = async (req, res, next) => {
    console.log(`[P]:::signUp`, req.body);
    /* ok
            200: 
            201: created
            */
    // return res
    //   .status(201)
    //   .json(await AccessService.signUp(req.body));
    new CREATED({
      message: 'Regiserted OK!',
      metadata: await AccessService.signUp(req.body)
    }).send(res)

  };
}

module.exports = new AccessController();
