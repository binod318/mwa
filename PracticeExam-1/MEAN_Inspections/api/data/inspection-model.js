const mongoose = require('mongoose');

const addressSchema = {
    city: String,
    zip: String
}

const inspectionSchema = mongoose.Schema({
    id: String,
    business_name: String,
    date: Date,
    result: String,
    address: addressSchema
})

mongoose.model(process.env.INSPECTION_MODEL, inspectionSchema, process.env.INSPECTIONS_COLLECTION)