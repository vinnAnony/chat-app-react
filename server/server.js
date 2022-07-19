import express from 'express'
import mongoose from 'mongoose'

import Messages from './dbMessages.js'

// app config
const app = express()
const port = process.env.PORT || 9000

// middleware
app.use(express.json());

// db config
const connection_url = 'mongodb+srv://admin:G0xdPZyfyqoZ0We1@cluster0.noy1kfj.mongodb.net/chatappdb?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// api routes
app.get('/',(req,res) => {res.status(200).send('hello world')});
app.post('/api/v1/messages/new',(req,res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
});
app.get('/api/v1/messages/sync',(req,res) => {

    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});

// listen
app.listen(port,() => {console.log(`Listening to port:${port}`);})