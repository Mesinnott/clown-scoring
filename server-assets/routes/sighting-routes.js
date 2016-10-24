let routes = require('express').Router();
let Sighting = require('../models/sighting')



routes.route("/sightings/:id?")

    .get(function (req, res) {
        if (req.params.id) {
            Sighting.getSighting(req.params.id, handleResponse)
            return
        }
        Sighting.getSightings(handleResponse)


        function handleResponse(err, data) {
            if (err) {
                return res.send(err)
            }
            res.send(data)
        }
    })
    .post(function (req, res) {
        Sighting.addSighting(req.body.sighting, function (err, data) {
            if (err) {
                return res.status(err)
            }
            res.send(data)
        })
    })
 .put(function (req, res) {
        Sighting.editSighting(req.params.id, req.body.sighting, function (err, data) {
            if (err) {
                return res.send({message:'invalid sighting id'})
            }
            res.send({message:'edit SUCCESS'})
        })
    })
    .delete(function (req, res) {
        Sighting.falseSighting(req.params.id, function (err, numReplaced) {
            if (err) {
                return res.sendStatus(204)
            }
            res.sendStatus(200)
        })
    })



    module.exports = { routes }