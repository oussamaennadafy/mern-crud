const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
    departureCity: {
        type: String,
        required: true
    },
    arrivalCity: {
        type: String,
        required: true,
    },
    departureTime: {
        type: String,
        required: true
    },
    departureDate: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

const trips = new mongoose.model("trips",tripSchema);


module.exports = trips;