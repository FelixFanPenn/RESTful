/**
 * Created by Felix on 6/18/17.
 */

const express = require("express");
const router = express.Router();
const Ninja = require("../models/ninja");

//get ninjas from db
router.get("/ninjas", function (req, res, next) {
    //return all ninjas
    //Ninja.find({}).then(function (ninjas) {
      //  res.send(ninjas);
    //});

    Ninja.geoNear(

        //must be an array
        [parseFloat(req.query.lng), parseFloat(req.query.lat)],

        {
            maxDistance: 100000,
            spherical: true
        }
    ).then(function (ninjas) {
        res.send(ninjas);
    })

});

//add new ninjas to db
router.post("/ninjas", function (req, res, next) {
    //create a new object using info from req and save it to db, after saving it to db, send response
    Ninja.create(req.body).then(function (ninja) {
        res.send(ninja);
    }).catch(next);
});

//update a ninja in db
router.put("/ninjas/:id", function (req, res, next) {
    Ninja.findByIdAndUpdate({_id: req.params.id}, req.body).then(function (ninja) {
        Ninja.findOne({_id: req.params.id}).then(function (ninja) {
            res.send(ninja);
        });
    });
});

// delete a ninja
router.delete("/ninjas/:id", function (req, res, next) {
    Ninja.findByIdAndRemove({_id: req.params.id}).then(function (ninja) {
        res.send(ninja);
    });
});

module.exports = router;