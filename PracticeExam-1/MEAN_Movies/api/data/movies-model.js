const mongoose = require('mongoose');

const viewerSchema = mongoose.Schema({
    rating: Number
})
const tomatoesSchema = mongoose.Schema({
    viewer: viewerSchema
})

const moviesSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required!']
    },
    year: Number,
    type: String,
    releaseDate: Date,
    genres: [String],
    directors: [String],
    poster: String,
    tomatoes: tomatoesSchema
});

mongoose.model(process.env.MOVIE_MODEL, moviesSchema, process.env.MOVIES_COLLECTION);