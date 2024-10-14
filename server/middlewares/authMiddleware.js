const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    let token = req.headers.authorization.split(" ")[1];
    const verifiedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
    
    
    next();
}