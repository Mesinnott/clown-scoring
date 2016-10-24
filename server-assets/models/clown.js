let Sighting = require('./sighting');
let ds = require('./data-adapter');
let db = ds.Clown;
let sightings= ds.Sighting;

// let DataStore = require('nedb')
// let db = new DataStore({
//     filename: './data/clowns.db',
//     autoload: true
// })
// let sightings = new DataStore({
//     filename:'./data/sightings.db',
//     autoload: true
// })


function Clown(name, hair, shoeSize, weapon, psycho) {
    this.name = name;
    this.hair = hair;
    this.shoeSize = shoeSize;
    this.weapon = weapon;
    this.psycho = psycho || true;
    this.dead = false;
    this.sightings=[];
}

function addSighting(sighting, cb) {
    findClown(sighting.clown, function (err, clown) {
        if (!clown || err) {
            return cb({ error: err, message: 'Sorry, that not work' })
        }
        // let newSighting = new Sighting(sighting.clown, sighting.location, sighting.spotter, sighting.time, sighting.date)
        let newSighting= new Sighting.createSighting(sighting)
        sightings.insert(newSighting, function (err, savedSighting) {
            if (err) {
                return cb(err)
            };
            clown.sightings=clown.sightings || []
            clown.sightings.push(savedSighting._id)
            editClown(clown._id, clown, function(err){
                if(err){cb(err)}
            cb(null, { message: 'you are lucky to be alive after seeing '+ clown.name+ ' the clown!' })
            })
        })
    })
}




function findClown(id, cb) {
    db.findOne({ _id: id }, cb);
};

function findClownAndItLocations(id, cb){
    db.findOne({_id: id}, function(err, clown){
        if(err||!clown) {return cb(err)}
        Sighting.findClownSightings(clown._id, function(err, sightings){
            if(err){return cb(err)}
            clown.sightings= sightings
            cb(null, clown)
        })
    });
};


function addClown(clown, cb) {
    let newClown = new Clown(clown.name, clown.hair, clown.shoeSize, clown.weapon, clown.psycho)
    // clowns.push(newClown)
    db.insert(newClown, function (err, newClown) {
        if (err) {
            return cb(err);
        }
        return cb(null, { message: 'clown added' })
    })
}


function getClowns(cb) {
    db.find({}, cb)
};

function killClown(id, cb) {

    db.update({_id:id}, {$set: {dead: true}}, {}, cb)
};

function editClown(id, newClown, cb) {
    db.update({_id:id}, {$set:{
        name:newClown.name,
        hair:newClown.hair,
        shoeSize: newClown.shoeSize,
        weapon:newClown.weapon,
        psycho: newClown.psycho,
        sightings: newClown.sightings
        }
    }, {}, cb)
};

module.exports = {
    addClown,
    addSighting,
    getClowns,
    killClown,
    editClown,
    findClownAndItLocations,
    getClown: findClown
}