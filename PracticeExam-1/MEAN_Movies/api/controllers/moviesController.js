const mongoose = require('mongoose');

const Movie = mongoose.model(process.env.MOVIE_MODEL);

const _checkError = function(error){
    if(error){
        const response = {
            status: process.env.SERVER_ERROR_STATUS_CODE,
            message: error
        }
        return response;
    }
}

const _checkDbResponse = function(dbResponse){
    if(dbResponse === null){
        const response = {
            status: process.env.FILE_NOT_FOUND_STATUS_CODE,
            message: process.env.DOCUMENT_NOT_FOUND_MESSAGE
        }
        return response;
    }
}

const _sendResponse = function(res, response){
    res.status(parseInt(response.status, process.env.NUMBER_BASE)).json(response.message);
}

//this function validates if the given is valid document object id
const _validateObjectId = function(id){
    const validObjectId = mongoose.isValidObjectId(id);
    if(!validObjectId){
        const response = {
            status: process.env.FILE_NOT_FOUND_STATUS_CODE,
            message: process.env.INVALID_DOCUMENT_OBJECT_ID + id
        }
        return response;
    }
}

const getAll = function(req, res){
    console.log('Get request received');
    let offset = parseInt(process.env.DEFAULT_OFFSET, process.env.NUMBER_BASE);
    let count = parseInt(process.env.DEFAULT_COUNT, process.env.NUMBER_BASE);
    let maxCount = parseInt(process.env.MAX_COUNT, process.env.NUMBER_BASE);

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, process.env.NUMBER_BASE);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count, process.env.NUMBER_BASE);
    }

    if(isNaN(offset) || isNaN(count)){
        const response = {
            status: process.env.CLIENT_ERROR_STATUS_CODE,
            message: process.env.PARAMETER_TYPE_ERROR_MESSAGE
        }
        _sendResponse(res, response);
        return;
    }

    if(count > maxCount){
        const response = {
            status: process.env.CLIENT_ERROR_STATUS_CODE,
            message: process.env.LIMIT_EXCEED_MESSAGE + maxCount
        }
        _sendResponse(res, response);
        return;
    }

    Movie.find().skip(offset).limit(count).select("title").exec(function(err, movies){
        let response = _checkError(err);
        if(!response){
            response = _checkDbResponse(movies);
            if(!response){
                response = {
                    status: process.env.OK_STATUS_CODE,
                    message: movies
                }
            }
        }

        _sendResponse(res, response);
    });
}

const getOne = function(req, res){
    const { movieId } = req.params;

    let response = _validateObjectId(movieId);
    if(response){
        _sendResponse(res, response);
        return;
    }

    Movie.findById(movieId).exec(function(err, movie){
        let response = _checkError(err);
        console.log(err, movie);
        if(!response){
            response = _checkDbResponse(movie);
            if(!response){
                response = {
                    status: process.env.OK_STATUS_CODE,
                    message: movie
                }
            }
        }

        _sendResponse(res, response);
    })
}

const deleteOne = function(req, res){
    const { movieId } = req.params;

    let response = _validateObjectId(movieId);
    if(response){
        _sendResponse(res, response);
        return;
    }

    Movie.findByIdAndDelete(movieId).exec(function(err, movie){
        let response = _checkError(err);
        if(!response){
            response = _checkDbResponse(movie);
            if(!response){
                response = {
                    status: process.env.UPDATE_SUCCESS_STATUS_CODE,
                    message: movie
                }
            }
        }

        _sendResponse(res, response);
    })
}

module.exports ={
    getAll,
    getOne,
    deleteOne
}