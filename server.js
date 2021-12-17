const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()

const app = express()
app.use(express.urlencoded({extended: true}))
app.use(cors())
const myDb = process.env.MONGO_URI
mongoose.connect(myDb,{ useNewUrlParser: true, useUnifiedTopology: true })

//Create Dad Joke Schema
const Schema = mongoose.Schema
const dadJokeSchema = new Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true}
})
const Joke = new mongoose.model('Joke', dadJokeSchema)


// App get routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/api/jokes', (req, res) => {
    Joke.find()
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err)
            res.json({err: "Some type of error happened."})
        }) 
})

// App post routes
app.post('/api/jokes', (req, res) => {
    const joke = new Joke({
        title: req.body.title,
        description: req.body.description
    })
    joke.save()
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            console.log(err)
            res.json({err: "Some type of error happened."})
        })   
})

app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));