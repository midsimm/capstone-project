const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    try {
        let token = req.headers.authorization.split(" ")[1];
        const verifiedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
        req.body.userId = verifiedToken.userId;
        next();
    } catch (err) {
        res.send({
            success: false,
            message: "Invalid token"
        });
    }
}