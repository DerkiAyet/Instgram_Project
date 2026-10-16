const { verify } = require('jsonwebtoken')
require('dotenv').config();

const validateToken = (req, res, next) => {

    const accessToken = req.header("accessToken");

    try {

        if(!accessToken) {
            res.json({
                error: "User not logged in"
            })
        }else {
            const validToken = verify(accessToken, process.env.JWT_SECRET);
            req.user = validToken;
    
            if(validToken) {
                return next();
            }
        }
        
    } catch (error) {
        
        res.status(500).json(error)

    }

}

module.exports = { validateToken }
