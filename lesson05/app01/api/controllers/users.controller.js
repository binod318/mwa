const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { response } = require('express');

const User = mongoose.model(process.env.USER_MODEL);

const _sendResponse = function(res, response){
    res.status(parseInt(response.status, process.env.NUMBER_BASE)).json(response.message);
}

const _checkError = function(error){
    //check error response
    if(error){ 
        const response = {
            status: process.env.SERVER_ERROR_STATUS_CODE,
            message: error
        };
        return response;
    }  
}

const _checDbResponse = function(dbResponse){
    if(dbResponse === null){
        const response = {
            status: process.env.FILE_NOT_FOUND_STATUS_CODE,
            message: process.env.DOCUMENT_NOT_FOUND_MESSAGE
        }
        return response;
    }
}

registerSync = function(req, res){
    console.log('POST request received');
    const saltValue = bcrypt.genSaltSync(parseInt(process.env.SALT_NUMBER_OF_ROUNDS, process.env.NUMBER_BASE));
    const passwordHash = bcrypt.hashSync(req.body.password, saltValue);

    const newUser = {
        name: req.body.name,
        username: req.body.username,
        password: passwordHash
    };

    User.create(newUser, function(err, user){
        //check error response
        let response = _checkError(err);
        if(!response){
            response = {
                status: process.env.UPDATE_SUCCESS_STATUS_CODE,
                message: user
            };
        }
        _sendResponse(res, response);
    })
}

register = function(req, res){
    console.log('POST request received');

    bcrypt.genSalt(parseInt(process.env.SALT_NUMBER_OF_ROUNDS, process.env.NUMBER_BASE), function(err, salt){
        let response = _checkError(err);
        if(response){
            _sendResponse(res, response);
        } else {
            console.log("Log1");
            bcrypt.hash(req.body.password, salt, function(err, passwordHash){
                let response = _checkError(err);
                console.log("Log2",err);
                if(response){
                    _sendResponse(res, response);
                } else {
                    const newUser = {
                        name: req.body.name,
                        username: req.body.username,
                        password: passwordHash
                    };
                    console.log("Log3");
                    User.create(newUser, function(err, user){
                        //check error response
                        let response = _checkError(err);
                        if(!response){
                            response = {
                                status: process.env.UPDATE_SUCCESS_STATUS_CODE,
                                message: user
                            };
                        }
                        _sendResponse(res, response);
                    })
                }
            });
        }
    })
}


getAll = function(req, res){
    User.find().exec(function(err, user){
        //check error response
        let response = _checkError(err);
        if(!response){
            response = {
                status: process.env.OK_STATUS_CODE,
                message: user
            };
        }
        _sendResponse(res, response);
    })
}

loginSync = function(req, res){
    console.log('login called');
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({username: username}).exec(function(err, user){
        let response = {
            status: 200,
            message: {}
        };

        if(err){
            console.log("error");
            response.status = process.env.SERVER_ERROR_STATUS_CODE;
            response.message = err;
        } else {
            if(!user) {
                console.log('Invalid username and password!');
                response.status = process.env.FILE_NOT_FOUND_STATUS_CODE;
                response.message = "Invalid username and password!";
            } else {
                console.log('User found');
                const passwordMatch = bcrypt.compareSync(password, user.password);
                if(passwordMatch){
                    response.message = "User found in DB";

                    const token = jwt.sign({name: user.name}, process.env.JWT_PASSWORD, {expiresIn: 3600});
                    response.message = {success: true, token: token};
                } else {
                    response.status = process.env.FILE_NOT_FOUND_STATUS_CODE;
                    response.message = "Invalid username and password!!";
                }
            }
        } 

        _sendResponse(res, response);
    })
}

login1 = function(req, res){
    console.log('loin request received');
    const { username, password } = req.body;
    User.findOne({username: username}).exec(function(err, user){
        let response = _checkError(err);
        if(response){
            _sendResponse(res, response);
        } else {
            response = _checDbResponse(user);
            if(response){
                _sendResponse(res, response);
            } else {
                console.log('User found');
                bcrypt.compare(password, user.password, function(err, match){
                    let response =_checkError(err);
                    if(!response){
                        if(match){


                    const token = jwt.sign({name: user.name}, process.env.JWT_PASSWORD, {expiresIn: 3600});
                   // response.message = {success: true, token: token};

                            response = {
                                status: process.env.OK_STATUS_CODE,
                                message: {success: true, token: token}
                            }
                        } else {
                            response = {
                                status: process.env.FILE_NOT_FOUND_STATUS_CODE,
                                message: "Invalid username and password!"
                            }
                        }
                    }
                    _sendResponse(res, response);
                })
            }
        }
    })
}

_handleError = function(error, response){
    response.status = process.env.SERVER_ERROR_STATUS_CODE;
    response.message = error;
}

_checkuserExists = function(user, response){
    return new Promise((resolve, reject) => {
        if(!user){
            response.status = process.env.UNAUTHORIZED_STATUS_CODE;
            response.message = process.env.UNAUTHORIZED_ERROR_MESSAGE;
            reject();
        } else {
            resolve(user);
        }
    })
}

_debugLog = function(message){
    console.log(process.env.DEBUG_LOG,!!false, !!("false"));
    if(JSON.parse(process.env.DEBUG_LOG)){
        console.log(message);
    }
}

_checkPassword = function(password, user, response){
    console.log('User found check password');
    return new Promise((resolve, reject) => {

        bcrypt.compare(password, user.password)
            .then((passwordMatch) => {
                if(passwordMatch){
                    resolve(user);
                } else {
                    response.status = process.env.UNAUTHORIZED_STATUS_CODE,
                    response.message = process.env.UNAUTHORIZED_ERROR_MESSAGE
                    reject();
                }
                    
            })
            .catch(error => {
                response.status = process.env.SERVER_ERROR_STATUS_CODE,
                response.message = error
                reject();
            });

    })
}

_generateToken = function(user, response) {
    _debugLog("generate token");
    const token = jwt.sign({name: user.name}, process.env.JWT_PASSWORD, {expiresIn: 3600});
    response.status = process.env.OK_STATUS_CODE;
    response.message = {success: true, token: token};
}

_callback = function(user){
    if(!user){
        response.status = process.env.UNAUTHORIZED_STATUS_CODE,
        response.message = process.env.UNAUTHORIZED_ERROR_MESSAGE
    }
}

login = function(req, res){
    console.log('login request received');
    const { username, password } = req.body;

    let response = {
        status: 200,
        message: {}
    };

    User.findOne({username: username})
        .then((user) => _checkuserExists(user, response))
        .then((user) => _checkPassword(password, user, response))
        .then((user) => _generateToken(user, response))
        .catch((error) => _handleError(error, response))
        .finally(() => _sendResponse(res, response));

}


module.exports = {
    addOne: register,
    login,
    getAll
}