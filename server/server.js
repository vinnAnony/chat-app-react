import express from 'express'
import mongoose from 'mongoose'
import Pusher from 'pusher'
import cors from 'cors'
import dotenv from 'dotenv'


if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
  }

// app config
const app = express()
const port = process.env.PORT || 9000

// middleware
app.use(express.json());
app.use(cors());

// db config

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: process.env.PUSHER_USE_TLS
});

const connection_url = process.env.MONGOOSE_URI
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
import messagesRoute from './controllers/message.controller.js';
app.use('/api/v1/messages', messagesRoute);

// listen
app.listen(port,() => {console.log(`Listening to port:${port}`);})