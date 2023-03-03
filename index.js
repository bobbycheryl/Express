//import express from node_modules
const { request } = require('express')
let express = require('express')
let mongoose = require('mongoose')
const songs = require('./songs')
let song = require ('./songs')
//create express app
let app = express()

// configure express app to parse incoming payload
// in json format
app.use(express.json())

// use mongoose to connect to db
let connectionString = "mongodb+srv://mongo-user:mongopassword@cluster0.rtwe1rb.mongodb.net/youtube"
mongoose.connect(connectionString)
let db = mongoose.connection

db.once('open', ()=>{
    console.log("Connection to mongodb in cloud is successful!!!")
})



/*
create root endpoint -> /
http://localhost:8080/
app.get(endpoint, callback)
endpoint -> /,  /todos/ get/friends/all
callback -> (incoming request, outgoing response)=>{}
*/

app.get("/", (request, response)=>{
    console.log("Request received....GET")
    console.log(request.url)
    response.send("<h1>Hello from server!</h1>")
})

/*
create endpoint -> /help
http://localhost:8080/help
GET Request
*/
app.get("/help", (request, response)=>{
    console.log("Request received....GET")
    console.log(request.url)
    // response.send("<h1>HELP from server!</h1>")
    response.json({
        status:"Success",
        request_type:"GET",
        message:"Send email to prafful@airasia.com",
        meaning:"I will retrieve the single/list of data from the server"
    })
})


/*
create endpoint -> /showrequest
http://localhost:8080/showrequest
*/
app.get("/showrequest", (request, response)=>{
    console.log("Request received....GET")
    console.log("*************Request start***************")
    console.log(request)
    console.log("*************Request ends****************");
    response.send("<h1>See Request object in JSON format in server console!</h1>")
})

/*
create endpoint -> /help
http://localhost:8080/help
POST request
*/
app.post("/help", (request, response)=>{
    console.log("Request received....POST")
    // console.log(request)
    console.log(request.body)
    console.log(request.body.name)
    console.log(request.body.location)
    console.log(request.url)
    response.json({
        status:"Success",
        request_type:"POST",
        message:"Send email to prafful@airasia.com",
        meaning:"I will add a new data to the server"
    })
})

/*
create endpoint -> /help
http://localhost:8080/help
PUT request

*/
app.put("/help", (request, response)=>{
    console.log("Request received....PUT")
    console.log(request.url)
    response.json({
        status:"Success",
        request_type:"PUT",
        message:"Send email to prafful@airasia.com",
        meaning:"I will update a data on the server"
    })
})

/*
create endpoint -> /help
http://localhost:8080/help
DELETE request
*/
app.delete("/help", (request, response)=>{
    console.log("Request received....DELETE")
    console.log(request.url)
    response.json({
        status:"Success",
        request_type:"DELETE",
        message:"Send email to prafful@airasia.com",
        meaning:"I will delete a data from the server"
    })
})

// get data from mongodb database

/*
http://localhost:8080/get/all/songs
*/
app.get("/get/all/songs",(request, response)=>{
    // use song ref/model in line 4 to interact
    // with song collection in mongodb db
    song.find({})
    .then((data)=>{
        response.json(data)
    })
    .catch((error)=>{
        response.json(error)
    })
})

/*
http://localhost:8080/add/songs
*/
app.post("/add/songs",(req, res)=>{
    console.log("Request body received from frontend")
    console.log(req.body)
    let newSongs = new songs()
    console.log(newSongs)
    newSongs.videoid = req.body.videoid
    newSongs.likes = req.body.likes
    newSongs.dislikes = req.body.dislikes
// insert newSongs to MongoDB db
    newSongs.save()
    .then((data)=>{
        res.json({
            "message":"success",
            "status":data
        })
    })
    .catch((error)=>{
        response.json(error)
    })

 /*
 http://localhost:8080/remove/song/64002d4521f87cca9f5f9707
 */
app.delete("/remove/songs/:id",()=>{
    console.log ("Remove one doc from song collection.....")
    console.log("id: "+ request.params.id)
   //use id to find and remove song from mongodb
    song.findByIdandDelete(request.params.id)
    .then((data)=>{
    response.json(data)
    })
    .catch(error=>{
    response.json(error)
    })

    response.send({})

   })

   res.send({})
})


/*
http://localhost:7070/update/song/64002c3521f87cca9f5f9705
*/

app.put('/update/song/:id', (request, response)=>{
    // received path variable
    // console.log("id:" + request.params.id)//
    console.log(`id: ${request.params.id}`)
    console.log("Request body received.....")
    console.log(request.body)
    // let songUpdate = new song()
    // songUpdate.videoid=request.body.videoid
    // songUpdate.likes=request.body.likes
    // songUpdate.dislikes=request.body.dislikes
    // songUpdate.isNew = false
    // update song collection with songUpdate in mongodb database
    songUpdate.save({_id: request.params.id},
        {
            $set:{
                videoid:request.body.videoid,
                likes:request.body.likes,
                dislikes: request.body.dislikes
            }
        })
    .then(data=>{
         response.json(data)
    })
    .catch(error=>{
    })
         response.json(error)
})



//define port for the API
let PORT = 7070
//listen on port
app.listen(PORT, ()=>{
    console.log("Listening on port " + PORT)
})

