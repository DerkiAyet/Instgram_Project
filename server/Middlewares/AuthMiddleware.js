const { verify } = require('jsonwebtoken')

const validateToken = (req, res, next) => {

    const accessToken = req.header("accessToken");

    try {

        if(!accessToken) {
            res.json({
                error: "User not logged in"
            })
        }else {
            const validToken = verify(accessToken, 'ImportantSecret');
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