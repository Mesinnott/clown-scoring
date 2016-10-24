
let DataStore = require('nedb')
let Clown = new DataStore({
    filename: './data/clowns.db',
    autoload: true
})
let Sighting = new DataStore({
    filename:'./data/sightings.db',
    autoload: true
})

module.exports = {
    Clown,
    Sighting
}