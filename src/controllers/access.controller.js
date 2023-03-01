'use strict'

class AccessController {
    signUp = async (req, res, next) => {
        try {
           console.log(`[P]:::signUp`, req.body) 
            /* 
            200: ok
            201: created
            */
           return res.status(200).json({
            code: 2001,
            metadata: {userId: 1}
           })
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = new AccessController()