let routes = require('express').Router();
let Clown = require('../models/clown')
routes.route("/clowns/:id?")
    .get(function (req, res) {
        if (req.params.id) {
            Clown.getClownAndItsLocations(req.params.id, handleResponse)
            return
        }
        Clown.getClowns(handleResponse)


        function handleResponse(err, data) {
            if (err) {
                return res.send(err)
            }
            res.send(data)
        }
    })
    .post(function (req, res) {
        Clown.addClown(req.body.clown, function (err, data) {
            if (err) {
                return res.status(err)
            }
            res.send(data)
        })
    })
    .put(function (req, res) {
        Clown.editClown(req.params.id, req.body.clown, function (err, data) {
            if (err) {
                return res.send({message:'invalid clown id'})
            }
            res.send({message:'edit SUCCESS'})
        })
    })
    .delete(function (req, res) {
        Clown.killClown(req.params.id, function (err, numReplaced) {
            if (err) {
                return res.sendStatus(204)
            }
            res.sendStatus(200)
        })
    })

routes.route('/clowns/:id/details')
.get(function(req, res){
    Clown.findClownAndItLocations(req.params.id, function(err, clown){
        if(err){return res.send(err)}
        res.send(clown)
    })
})

routes.route('/clown/spotted')
.post(function(req, res){
    Clown.addSighting(req.body.sighting, function(err, clown){
        if(err){return res.send(err)}
        res.send(clown)
    })
})

module.exports = { routes }