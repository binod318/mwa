const { response } = require("express");
const { ObjectId } = require("mongodb");
const mongoose = require('mongoose');

const Game = mongoose.model(process.env.GAME_MODEL);

module.exports.getAll = function(req, res){
    console.log("GET All Received");

    //get value from environment variable
    let offset=parseInt(process.env.DEFAULT_OFFSET, process.env.NUMBER_BASE); //10 is base for conversion
    let count= parseInt(process.env.DEFAULT_COUNT, process.env.NUMBER_BASE);
    let maxCount = parseInt(process.env.MAX_COUNT, process.env.NUMBER_BASE);

    //check query string parameters
    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset, process.env.NUMBER_BASE);
    }
    if(req.query && req.query.count){
        count = parseInt(req.query.count, process.env.NUMBER_BASE);
    }

    // type check of the variables to be used
    if(isNaN(offset) || isNaN(count)){
        res.status(parseInt(process.env.CLIENT_ERROR_STATUS_CODE)).json({message: process.env.PARAMETER_TYPE_ERROR_MESSAGE});
        return;
    }

    //limit check
    if(count > maxCount){
        res.status(parseInt(process.env.CLIENT_ERROR_STATUS_CODE)).json({message: process.env.LIMIT_EXCEED_MESSAGE + maxCount});
        return;
    }

    Game.find().skip(offset).limit(count).exec(function(err, games){
        const response = {
            status: process.env.OK_STATUS_CODE,
            message: games
        };

        //check error response
        if(err){
            response.status = process.env.SERVER_ERROR_STATUS_CODE;
            response.message = err;
        } 

        //single termination points
        res.status(parseInt(response.status, process.env.NUMBER_BASE)).json(response.message);
    })
}

module.exports.getOne = function(req, res){
    console.log("GET One Received");
    const gameId = req.params.gameId; //req.params is url params

    //check parameter type
    const validGameId = mongoose.isValidObjectId(gameId);

    if(validGameId){
        Game.findById(gameId).exec(function(err, game){
            const response = {
                status: process.env.OK_STATUS_CODE,
                message: game
            };

            //check error response
            if(err){
                response.status = process.env.SERVER_ERROR_STATUS_CODE;
                response.message = err;
            } else if(game === null){ //check response object
                response.status = process.env.FILE_NOT_FOUND_STATUS_CODE;
                response.message = process.env.INVALID_IDENTIFIER_MESSAGE;  
            }

            //single termination points
            res.status(parseInt(response.status, process.env.NUMBER_BASE)).json(response.message);
        });
    } else {
        res.status(parseInt(process.env.FILE_NOT_FOUND_STATUS_CODE)).json({message: process.env.INVALID_DOCUMENT_OBJECT_ID_MESSAGE});
    }
    
}

module.exports.addOne = function(req, res){
    console.log("Add Game Request received");
    const newGame = { 
        title, 
        price, 
        year, 
        rate, 
        minPlayers, 
        maxPlayers, 
        reviews, 
        minAge, 
        designers  
    } = req.body;

    Game.create(newGame, function(err, game){
        const response = {
            status: process.env.CREATE_SUCCESS_STATUS_CODE,
            message: game
        };

        //check error response
        if(err){
            response.status = process.env.SERVER_ERROR_STATUS_CODE;
            response.message = err;
        }
        
        //single termination point
        res.status(parseInt(response.status, process.env.NUMBER_BASE)).json(response.message);
    });
}

module.exports.updateOne = function(req, res){
    console.log("Update Game Request received");
    const gameId = req.params.gameId;

    //check parameter type
    const validGameId = mongoose.isValidObjectId(gameId);

    if(!validGameId){
        res.status(parseInt(process.env.FILE_NOT_FOUND_STATUS_CODE)).json({message: process.env.INVALID_DOCUMENT_OBJECT_ID_MESSAGE});
        return;
    }

    Game.findById(gameId).exec(function(err, game){

        //check error response
        if(err){ 
            res.status(parseInt(process.env.SERVER_ERROR_STATUS_CODE)).json(err);
            return;
        } 

        if(game === null){ 
            res.status(parseInt(process.env.FILE_NOT_FOUND_STATUS_CODE)).json({message: process.env.INVALID_IDENTIFIER_MESSAGE});
            return;
        } 

        game.title       = req.body.title     
        game.price       = req.body.price     
        game.year        = req.body.year      
        game.rate        = req.body.rate      
        game.minPlayers  = req.body.minPlayers
        game.maxPlayers  = req.body.maxPlayers
        game.reviews     = req.body.reviews   
        game.minAge      = req.body.minAge    
        game.designers   = req.body.designers; 

        game.save(function(err, updatedGame){
            const response = {
                status: process.env.OK_STATUS_CODE,
                message: updatedGame
            };
    
            //check error response
            if(err){ 
                response.status = process.env.SERVER_ERROR_STATUS_CODE; 
                response.message = err;
            } 
    
            //single termination points
            res.status(parseInt(response.status, process.env.NUMBER_BASE)).json(response.message);
        })
    });  
}

module.exports.partialUpdateOne = function(req, res){
    console.log("Update Game Request received");
    const gameId = req.params.gameId;

    //check parameter type
    const validGameId = mongoose.isValidObjectId(gameId);

    if(!validGameId){
        res.status(parseInt(process.env.FILE_NOT_FOUND_STATUS_CODE)).json({message: process.env.INVALID_DOCUMENT_OBJECT_ID_MESSAGE});
        return;
    }

    Game.findById(gameId).exec(function(err, game){

        //check error response
        if(err){ 
            res.status(parseInt(process.env.SERVER_ERROR_STATUS_CODE)).json(err);
            return;
        } 

        if(game === null){ 
            res.status(parseInt(process.env.FILE_NOT_FOUND_STATUS_CODE)).json({message: process.env.INVALID_IDENTIFIER_MESSAGE});
            return;
        } 

        if(req.body.title ) 
            game.title       = req.body.title;     
        if(req.body.price )
            game.price       = req.body.price;     
        if(req.body.year )
            game.year        = req.body.year;      
        if(req.body.rate  )
            game.rate        = req.body.rate;  
        if(req.body.minPlayers)    
            game.minPlayers  = req.body.minPlayers;
        if(req.body.maxPlayers)
            game.maxPlayers  = req.body.maxPlayers;
        if(req.body.reviews)
            game.reviews     = req.body.reviews;   
        if(req.body.minAge)
            game.minAge      = req.body.minAge;  
        if(req.body.designers)  
            game.designers   = req.body.designers; 

        game.save(function(err, updatedGame){
            const response = {
                status: process.env.OK_STATUS_CODE,
                message: updatedGame
            };
    
            //check error response
            if(err){ 
                response.status = process.env.SERVER_ERROR_STATUS_CODE; 
                response.message = err;
            } 
    
            //single termination points
            res.status(parseInt(response.status, process.env.NUMBER_BASE)).json(response.message);
        })
    });  
}

module.exports.deleteGame = function(req, res){
    console.log("Delete game request received");
    const gameId = req.params.gameId;

    const validGameId = mongoose.isValidObjectId(gameId)

    if(!validGameId){
        res.status(parseInt(process.env.FILE_NOT_FOUND_STATUS_CODE)).json({message: process.env.INVALID_DOCUMENT_OBJECT_ID_MESSAGE});
        return;
    }
console.log("BBBB");
    Game.findByIdAndDelete(gameId).exec(function(err, game){
        const response = {
            status: process.env.OK_STATUS_CODE,
            message: game
        };

        //check error response
        if(err){ 
            response.status = process.env.SERVER_ERROR_STATUS_CODE; 
            response.message = err;
        } 

        //single termination points
        res.status(parseInt(response.status, process.env.NUMBER_BASE)).json(response.message);
    })
}