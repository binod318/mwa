const jwt = require('jsonwebtoken');
const util = require('util');

const _sendResponse = function(res, response){
    res.status(parseInt(response.status, process.env.NUMBER_BASE)).json(response.message);
}

const authenticate = function(req, res, next){
    const response = {
        status: 403,
        message: {message: "No token provided"}
    }

    const headerExists = req.headers.authorization;

    if(headerExists){
        const token = req.headers.authorization;

        const jwtVerifyPromise = util.promisify(jwt.verify, {context: jwt});
        jwtVerifyPromise(token, process.env.JWT_PASSWORD)
            .then(() => next())
            .catch(() => {
                response.message = "Invalid token";
                _sendResponse(res, response);
            });
    } else {
        _sendResponse(res, response);
    }
}

module.exports = {
    authenticate
}