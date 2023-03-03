'use strict'
const AccessService = require('../services/access.service')
class AccessController {
    signUp = async (req, res, next) => {
        try {
           console.log(`[P]:::signUp`, req.body) 
            /* ok
            200: 
            201: created
            */
            return res.status(201).json(
            await AccessService.signUp(req.body)
           )
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = new AccessController()