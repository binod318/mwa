const mongoose = require('mongoose');

const Inspection= mongoose.model(process.env.INSPECTION_MODEL);

const _sendResonse = function(res, response){
    res.status(parseInt(response.status, process.env.NUMBER_BASE)).json(response.message);
}

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
            message: process.env.DOCUMENT_NOT_FOUND_MSG
        }
        return response;
    }
}

const _validateObjectId = function(id){
    const isValid = mongoose.isValidObjectId(id);
    if(!isValid){
        const response = {
            status: process.env.CLIENT_ERROR_STATUS_CODE,
            message: process.env.INVALID_DOCUMENT_ID_MSG
        }
        return response;
    }
}

const getAll = function(req, res){
    let offset = parseInt(process.env.DEFAULT_OFFSET, process.env.NUMBER_BASE);
    let count = parseInt(process.env.DEFAULT_COUNT, process.env.NUMBER_BASE);
    let maxCount = parseInt(process.env.MAX_COUNT, process.env.NUMBER_BASE);

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, process.env.NUMBER_BASE);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count, process.env.parseInt);
    }

    if(isNaN(offset) || isNaN(count)){
        const response = {
            status: process.env.CLIENT_ERROR_STATUS_CODE,
            message: process.env.PARAM_TYPE_ERROR_MESSAGE
        }
        _sendResonse(res, response);
        return;
    }

    if(count > maxCount){
        const response = {
            status: process.env.CLIENT_ERROR_STATUS_CODE,
            message: process.env.LIMIT_EXCEEDED
        }
        _sendResonse(res, response);
        return;
    }

    Inspection.find({}).skip(offset).limit(count).select("business_name").exec(function(err, inspections){
        let response = _checkError(err);
        if(!response){
            response = _checkDbResponse(inspections);
            if(!response){
                response = {
                    status: process.env.OK_STATUS_CODE,
                    message: inspections
                }
            }
        }

        _sendResonse(res, response);
    })
}

const getOne = function(req, res){
    const { inspectionId } = req.params;
    let response = _validateObjectId(inspectionId);
    if(response){
        _sendResonse(res, response);
        return;
    }

    Inspection.findById(inspectionId).exec(function(err, inspection){
        let response = _checkError(err);
        if(!response){
            response =_checkDbResponse();
            if(!response){
                response = {
                    status: process.env.OK_STATUS_CODE,
                    message: inspection
                }
            }
        }
        _sendResonse(res, response);
    })
}

const deleteOne = function(req, res){
    const { inspectionId } =req.params;

    let response = _validateObjectId(inspectionId);
    if(response){
        _sendResonse(res, response);
        return;
    }

    Inspection.findByIdAndDelete(inspectionId).exec(function(err, inspection){
        let response = _checkError(err);
        if(!response){
            response = _checkDbResponse(inspection);
            if(!response){
                response = {
                    status: process.env.UPDATE_STATUS_CODE,
                    message: inspection
                }
            }
        }
        _sendResonse(res, response);
    })
}

module.exports = {
    getAll,
    getOne,
    deleteOne
}