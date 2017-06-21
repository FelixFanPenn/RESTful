/**
 * Created by Felix on 6/18/17.
 */

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//create express app
const app = express();

//connect to mongodb
mongoose.connect("mongodb://localhost/ninjago");
mongoose.Promise = global.Promise;

// static is used to serve static file, no meaning to go thru all those functions and callbacks
app.use(express.static("public")); // only look at public file
// if a request to 4000/index.html ==>> will just go to public/index.html

app.use(bodyParser.json());
app.use("/api", require("./routes/api"));

//create middleware for error handling
app.use(function (err, req, res, next) {
    res.send(422, {error: err.message});
});

//listen for requests
app.listen(process.env.port || 4000, function () {
    console.log("listening for requests at 4000")
})