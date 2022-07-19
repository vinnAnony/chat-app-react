import express from 'express'
import mongoose from 'mongoose'
import Pusher from 'pusher'
import cors from 'cors'

import Messages from './dbMessages.js'

// app config
const app = express()
const port = process.env.PORT || 9000

// middleware
app.use(express.json());
app.use(cors());

// db config

const pusher = new Pusher({
    appId: "1439441",
    key: "0e6f8a1400d4484ca992",
    secret: "0d5b98701a2ce0c77760",
    cluster: "mt1",
    useTLS: true
});

const connection_url = 'mongodb+srv://admin:G0xdPZyfyqoZ0We1@cluster0.noy1kfj.mongodb.net/chatappdb?retryWrites=true&w=majority'
mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
    console.log('DB connected');
    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();

    changeStream.on('change',(change) => {
        console.log('changed',change);

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', "inserted", {
                user: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            })
        } else {
            console.log('Error triggering Pusher');
        }
    });
});

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