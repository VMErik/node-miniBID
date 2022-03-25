// File to validate token
const jsonwebtoken = require('jsonwebtoken');

function auth(req, res, next) {
    // Extract the token from the heders
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ message: 'Access Denied' })
    }
    try {
        const verified = jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(401).send({ message: 'Invalid Token' });
    }
}


module.exports = auth;