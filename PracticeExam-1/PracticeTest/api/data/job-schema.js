const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema({
    city: String,
    coordinates: [Number]
})

const jobSchema = mongoose.Schema({
    title:String,
    salary:Number,
    location:LocationSchema,
    description:String,
    experience:String,
    skills:[String],
    postDate: Date
})

mongoose.model(process.env.JOB_MODEL, jobSchema, process.env.JOBS_COLLECTION);