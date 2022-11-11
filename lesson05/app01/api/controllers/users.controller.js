const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
            bcrypt.hash(req.body.password, salt, function(err, passwordHash){
                let response = _checkError(err);
                if(response){
                    _sendResponse(res, response);
                } else {
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

login = function(req, res){
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
                } else {
                    response.status = process.env.FILE_NOT_FOUND_STATUS_CODE;
                    response.message = "Invalid username and password!!";
                }
            }
        } 

        _sendResponse(res, response);
    })
}

module.exports = {
    addOne: register,
    login,
    getAll
}