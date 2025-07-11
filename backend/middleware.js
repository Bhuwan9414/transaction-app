const jwt = require("jsonwebtoken")
const JWT_SECRET = require("./config")

const authMiddleware = function(req, res, next){

    const authheader = req.headers.authorization;

    if(!authheader || !authheader.startsWith("Bearer")){
        return res.status(404).json({
            msg : "invalid auth header"
        })
    }

    const token = authheader.split(" ")[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);

        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        }
        else{
            return res.status(403).json({
                msg : "invalid auth header"
            })
        }
    }catch (err){
        return res.status(403).json({
            msg : "invalid auth header"
        });
    }
}

module.exports = {
    authMiddleware
}