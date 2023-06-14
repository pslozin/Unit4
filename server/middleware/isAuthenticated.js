require('dotenv').config()
const jwt = require('jsonwebtoken') //CONNECTING JWT COMPONENTS
const {SECRET} = process.env //EXPORTING SECRET PHRASE FROM .ENV

module.exports = {
    isAuthenticated: (req, res, next) => {
        const headerToken = req.get('Authorization')

        if (!headerToken) {      //VERIFYING headerToken TRUE or FALSE 
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token

        try {
            token = jwt.verify(headerToken, SECRET) //VERIFYING TOKEN BASED ON SECRET PHRASE
        } catch (err) {
            err.statusCode = 500
            throw err
        }

        if (!token) {   //VERIFYING token TRUE or FALSE 
            const error = new Error('Not authenticated.')
            error.statusCode = 401
            throw error
        }

        next()
    }
}