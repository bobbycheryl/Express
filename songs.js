let mongoose = require ("mongoose")

// use mongoose to initialise schema
let mongoSchema = mongoose.Schema

// use mongoSchema to create ref. to song collecton
let songSchema = new mongoSchema({
    "videoid":String,
    "likes":Number,
    "dislikes":Number
},{
    collection:"songs"
})

// export the model
module.exports = mongoose.model('songs', songSchema)