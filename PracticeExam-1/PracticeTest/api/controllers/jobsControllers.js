const mongoose = require('mongoose');

const Job = mongoose.model(process.env.JOB_MODEL);

const _getInt = function(num){
    return parseInt(num, process.env.NUMBER_BASE);
}

const _getEnv = function(name){
    let result = process.env[name];
    if(!result)
        result = process.env[name.toUpperCase()];
    return result;
}

const _sendResponse = function(res, response){
    res.status(_getInt(response.status)).json(response.message);
}

const _checkError = function(error){
    if(error){
        const response = {
            status: _getEnv('SERVER_ERROR_STATUS_CODE'),
            message: error
        }
        return response;
    }
}

const _checkDbResponse = function(dbResponse){
    if(dbResponse === null){
        const response = {
            status: _getEnv('NOT_FOUND_STATUS_CODE'),
            message: _getEnv('DOCUMENT_NOT_FOUND_MSG')
        }
        return response;
    }
}

const _validateObjectId = function(id){
    const isValid= mongoose.isValidObjectId(id);
    if(!isValid){
        const response = {
            status: _getEnv('NOT_FOUND_STATUS_CODE'),
            message: _getEnv('INVALID_DOCUMENT_ID_MSG')
        }
        return response;
    }
}

const getAll = function(req, res){
    let offset = _getInt(_getEnv('DEFAULT_OFFSET'));
    let count = _getInt(_getEnv('DEFAULT_COUNT'));
    let maxCount = _getInt(_getEnv('MAX_COUNT'));

    if(req.query && req.query.offset){
        offset = _getInt(req.query.offset);
    }

    if(req.query && req.query.count){
        count = _getInt(req.query.count);
    }

    if(isNaN(offset) || isNaN(count)){
        const response = {
            status: _getEnv('CLIENT_ERROR_STATUS_CODE'),
            message: _getEnv('PARAM_TYPE_ERROR_MSG')
        }
        _sendResponse(res, response);
        return;
    }

    if(count > maxCount){
        const response = {
            status: _getEnv('CLIENT_ERROR_STATUS_CODE'),
            message: _getEnv('LIMIT_EXCEEDED_MSG')
        }
        _sendResponse(res, response);
        return;
    }

    let query = {};
    if(req.query && req.query.search){
        query = {'skills': RegExp(req.query.search)};
    }

    Job.find(query).skip(offset).limit(count).exec(function(err, jobs){
        let response = _checkError(err);
        if(!response){
            response = _checkDbResponse(jobs);
            if(!response){
                response = {
                    status: _getEnv('OK_STATUS_CODE'),
                    message: jobs
                }
            }
        }
        _sendResponse(res, response);
    });
}

const getOne = function(req, res){
    const { jobId } = req.params;

    let response = _validateObjectId(jobId);
    if(response){
        _sendResponse(res, response);
        return;
    }

    Job.findById(jobId).exec(function(err, job){
        let response = _checkError(err);
        if(!response){
            response = _checkDbResponse(job);
            if(!response){
                response = {
                    status: _getEnv('OK_STATUS_CODE'),
                    message: job
                }
            }
        }
        _sendResponse(res, response);
    });
}

const addOne = function(req, res){
    const newJob = {
        title,
        salary,
        description,
        experience,
        skills,
        postDate
    } = req.body;

    Job.create(newJob, function(err, job){
        let response = _checkError(err);
        if(!response) {
            response = _checkDbResponse(job);
            if(!response){
                response = {
                    status: _getEnv('CREATE_STATUS_CODE'),
                    message: job
                }
            }
        }
        _sendResponse(res, response);
    });
}

const deleteOne = function(req, res){
    const { jobId } = req.params;

    let response = _validateObjectId(jobId);
    if(response){
        _sendResponse(res, response);
        return;
    }

    Job.findByIdAndDelete(jobId).exec(function(err, job){
        let response = _checkError(err);
        if(!response){
            response =_checkDbResponse(job);
            if(!response){
                response = {
                    status: _getEnv('UPDATE_STATUS_CODE'),
                    message: job
                }
            }
        }
        _sendResponse(res, response);
    });
}

module.exports = {
    getAll,
    getOne,
    addOne,
    deleteOne
}