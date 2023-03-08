'use strict';
const AccessService = require('../services/access.service');
class AccessController {
  signUp = async (req, res, next) => {
    console.log(`[P]:::signUp`, req.body);
    /* ok
            200: 
            201: created
            */
    return res
      .status(201)
      .json(await AccessService.signUp(req.body));
  };
}

module.exports = new AccessController();
