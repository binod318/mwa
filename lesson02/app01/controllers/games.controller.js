const { ObjectId } = require("mongodb");
const dbConnection=require("../data/dbconnection");

module.exports.getAll = function(req, res){
    console.log("GET All Received");

    let offset=0;
    let count= 7;

    if(req.query && req.query.offset){
        offset = parseInt(req.query.offset);
    }
    if(req.query && req.query.count){
        count = req.query.count > 7 ? count : parseInt(req.query.count);
    }

    const db = dbConnection.get();

    const gamesCollection = db.collection("games");
    gamesCollection.find().skip(offset).limit(count).toArray(function(err, games){
        res.status(parseInt(process.env.OK_STATUS_CODE)).json(games);
    });
}

module.exports.getOne = function(req, res){
    console.log("GET One Received");
    const id = req.params.gameId; //req.params is url params

    const db = dbConnection.get();
    const gamesCollection = db.collection("games");

    const game = {_id: ObjectId(id)};

    gamesCollection.findOne(game, function(err, game){
        if(err){
            res.status(parseInt(process.env.SERVER_ERROR_STATUS_CODE)).json({error: err});
        } else {
            res.status(parseInt(process.env.OK_STATUS_CODE)).json(game);
        }
    });
}

module.exports.createGame = function(req, res){
    console.log("Create Game Request received");
    const { 
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

    //get database
    const db = dbConnection.get();
    //get collection
    const gamesCollection = db.collection("games");
    
    let newGame = {};
    if(title && price && minPlayers < 12 && minPlayers > 0 && minAge < 100 && minAge > 5){
        newGame.title = title;
        newGame.price = price;
        newGame.year = year;
        newGame.rate = rate;
        newGame.minPlayers = minPlayers;
        newGame.maxPlayers = maxPlayers;
        newGame.reviews = reviews;
        newGame.minAge = minAge;
        newGame.designers = designers;

        //do db operation
        gamesCollection.insertOne(newGame, function(err, objectId){
            if(err){
                res.status(parseInt(process.env.SERVER_ERROR_STATUS_CODE)).json({error: err});
            } else {
                res.status(parseInt(process.env.CREATE_SUCCESS_STATUS_CODE)).json({message: process.env.CREATE_SUCCESS_MESSAGE});
            }
        });
    } else {
        console.log("Data missing from POST body");
        res.status(parseInt(process.env.CLIENT_ERROR_STATUS_CODE)).json({error : process.env.VALIDATION_MESSAGE});
    }
}

module.exports.updateGame = function(req, res){
    console.log("Update Game Request received");
    const { 
        id,
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

    //get database
    const db = dbConnection.get();
    //get collection
    const gamesCollection = db.collection("games");
    
    const game = {_id: ObjectId(id)};
    let updateGame = {};
    if(title && price && minPlayers < 12 && minPlayers > 0 && minAge < 100 && minAge > 5){
        if(title) updateGame.title = title;
        if(price) updateGame.price = price;
        if(year) updateGame.year = year;
        if(rate) updateGame.rate = rate;
        if(minPlayers) updateGame.minPlayers = minPlayers;
        if(maxPlayers) updateGame.maxPlayers = maxPlayers;
        if(reviews) updateGame.reviews = reviews;
        if(minAge) updateGame.minAge = minAge;
        if(designers) updateGame.designers = designers;

        //do db operation
        gamesCollection.updateOne(game, {$set: updateGame}, function(err, objectId){
            if(err){
                res.status(parseInt(process.env.SERVER_ERROR_STATUS_CODE)).json({error: err});
            } else {
                res.status(parseInt(process.env.CREATE_SUCCESS_STATUS_CODE)).json({message: process.env.UPDATE_SUCCESS_MESSAGE});
            }
        });
    } else {
        console.log("Data missing from POST body");
        res.status(parseInt(process.env.CLIENT_ERROR_STATUS_CODE)).json({error : process.env.VALIDATION_MESSAGE});
    }
}

module.exports.deleteGame = function(req, res){
    console.log("Delete game request received");
    const id = req.params.gameId;

    const db = dbConnection.get();
    const gamesCollection = db.collection("games");

    const game = {_id: ObjectId(id)};
    gamesCollection.deleteOne(game, function(err, result){
        if(err){
            res.status(parseInt(process.env.SERVER_ERROR_STATUS_CODE)).json({error: err});
        } else {
            console.log(result)
            res.status(parseInt(process.env.OK_STATUS_CODE)).json({message: process.env.DELETE_SUCCESS_MESSAGE});
        }
    });
}