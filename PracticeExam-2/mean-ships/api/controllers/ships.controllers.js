const mongoose = require("mongoose");
const Ship = mongoose.model(process.env.SHIP_MODEL);

const _sendResponse = function(res, response){
    res.status(parseInt(response.status, process.env.NUMBER_BASE)).json(response.message);
}

const _searchGeoQuery = function(req, res){
    let minDist = parseFloat(process.env.GEO_SEARCH_MIN_DIST, process.env.NUMBER_BASE);
    let maxDist = parseFloat(process.env.GEO_SEARCH_MAX_DIST, process.env.NUMBER_BASE);

    let lng = parseFloat(req.query.lng, process.env.NUMBER_BASE);
    let lat = parseFloat(req.query.lat, process.env.NUMBER_BASE);

    if(req.query.dist){
        maxDist = parseFloat(req.query.dist, process.env.NUMBER_BASE);
    }
    
    if(isNaN(maxDist) || isNaN(lat) || isNaN(lng)){
        let response = {
            status: process.env.CLIENT_ERROR_STATUS_CODE,
            message: process.env.PARAM_TYPE_ERROR_MSG
        }
        _sendResponse(res, response);
    }

    const point = { type: "Point", coordinates:[lng, lat]};

    const query = {
        "coordinates": {
            $near: {
                $geometry: point,
                $maxDistance: maxDist,
                $minDistance: minDist
            }
        }
    };

    Ship.find(query).skip().limit().exec(function(err, ships){
        let response = {
            status: process.env.REST_API_OK,
            message: ships
        }
        if(err){
            response.status = process.env.REST_API_SYSTEM_ERROR;
            response.message = err;
        }

        _sendResponse(res, response);
    })
}

const _getNum = function(num){
    return parseInt(num, process.env.NUMBER_BASE)
}

const _getEnv = function(name){
    let returnValue = process.env[name];
    if(!returnValue)
        returnValue = process.env[name.toUpperCase()];
    return returnValue;
}

const getAll = function (req, res) {
    let offset = _getNum(process.env.DEFAULT_FIND_OFFSET);
    let count = _getNum(process.env.DEFAULT_FIND_COUNT);
    let maxCount = _getNum(process.env.DEFAULT_MAX_FIND_LIMIT);

    if(req.query && req.query.offset){
        offset = _getNum(req.query.offset);
    }

    if(req.query && req.query.count){
        count = _getNum(req.query.count);
    }

    if(isNaN(offset) || isNaN(count) || isNaN(maxCount)){
        const response = {
            status: process.env.CLIENT_ERROR_STATUS_CODE,
            message: process.env.PARAM_TYPE_ERROR_MSG
        }
        _sendResponse(res, response);
        return;
    }

    if(count > maxCount){
        const response = {
            status: process.env.CLIENT_ERROR_STATUS_CODE,
            message: process.env.LIMIT_EXCEEDED_MSG
        }
        _sendResponse(res, response);
        return;
    }

    if(req.query && req.query.lat && req.query.lng){
        _searchGeoQuery(req, res);
        return;
    }
    Ship.find().skip(offset).limit(count).exec(function (err, ships) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: ships
        };
        if (err) {
            response.status= parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message= err;
        }
        res.status(response.status).json(response.message);
    });
}

const getOne = function (req, res) {
    const shipId = req.params.shipId;
    Ship.findById(shipId).exec(function (err, ship) {
        const response = {
            status: parseInt(process.env.REST_API_OK, 10),
            message: ship
        };
        if (err) {
            response.status = parseInt(process.env.REST_API_SYSTEM_ERROR, 10);
            response.message = err;
        } else if (!ship) {
            response.status = parseInt(process.env.REST_API_RESOURCE_NOT_FOUND_ERROR, 10);
            response.message = {
                "message": process.env.REST_API_RESOURCE_NOT_FOUND_MESSAGE
            };
        }
        res.status(response.status).json(response.message);
    });
}

module.exports = {
    getAll: getAll,
    getOne: getOne
};