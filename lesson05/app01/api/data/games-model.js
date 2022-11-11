const mongoose = require('mongoose');

const publisherSchema = mongoose.Schema({
    name: String,
    country: String,
    established: Number,
    location: {
        coordinates: {
            type: [Number], // stores longitude, latitude
            index: "2dsphere"
        }
    }
});

const gameSchema = mongoose.Schema({
    title: { //title is a path here
        type: String,
        required: [true, 'Title is required!']
    },
    year: Number,
    rate: {
        type: Number,
        min: 1,
        max: 5,
        default: 1 //"default" - because default is a keyword
    },
    price: Number,
    reviews: String,
    minPlayers: Number,
    maxPlayers: Number,
    minAge: Number,
    publisher: publisherSchema,
    designers: [String] //array of String
});

//compiling model
//last parameter is collection name, if not given then it uses first param and makes lowercase and adds 's' at the end
mongoose.model(process.env.GAME_MODEL, gameSchema, process.env.GAMES_COLLECTION); 