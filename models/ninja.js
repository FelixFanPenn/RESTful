/**
 * Created by Felix on 6/18/17.
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create geolocation Schema
const GeoSchema = new Schema({
    type: {
        type: String,
        default: "point"
    },

    coordinates: {
        type: [Number]
        //index: "2dsphere"
    }

});

//create ninjas Schema & model
const NinjaSchema = new Schema({
    name: {
        type: String,
        required: [true, "name field is required"]
    },

    rank: {
        type: String
    },

    available: {
        type: Boolean,
        default: false
    },

    geometry: GeoSchema
});

const Ninja = mongoose.model("ninja", NinjaSchema); // "ninja" is the collection name in mongo db!!!
module.exports = Ninja;