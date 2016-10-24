// let DataStore = require('nedb')
let db = require('./data-adapter').Sighting;
// let sightings= require('./data-adapter').Sighting;

// let Clown = require('./clown')
let moment = require('moment')
// let DataStore = require('nedb')
// let db = new DataStore({
//     filename: './data/sightings.db',
//     // autoload: true
// })


function Sighting(sighting) {
    this.clown = sighting.clown;
    this.location = sighting.location;
    this.spotter = sighting.spotter;
    this.time = moment();
    this.report = true;
}

function findClownSightings(clownId, cb){
    db.load(function(){ 
    db.find({clown: clownId}, cb);
    })
}
// function Sighting(sighting){
//     this.clown =sighting.clown, 
//     this.location=sighting.location,
//     this.date-Date.now()
// }

function findSighting(id, cb) {
    db.findOne({ _id: id }, cb);
};


function getSightings(cb) {
    db.find({}, cb)
};

function falseSighting(id, cb) {

    db.update({ _id: id }, { $set: { report: false } }, {}, cb)
};

function editSighting(id, newSight, cb) {
    db.update({ _id: id }, {
        $set: {
            clown: newSight.clown,
            location: newSight.location,
            spotter: newSight.spotter,
            time: newSight.time,
        }

    }, {}, cb)

        ;
}


module.exports = {
    getSightings,
    falseSighting,
    editSighting,
    findClownSightings,
    createSighting: Sighting,
    getSighting: findSighting
}