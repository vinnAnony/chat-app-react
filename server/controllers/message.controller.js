import express from "express"
const router = express.Router();

import Messages from '../models/message.model.js'



router.get('/',(req,res) => {res.status(200).send('hello world')});

router
.post('/new',(req,res) => {
    const dbMessage = req.body

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
});

router
.get('/sync',(req,res) => {

    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});

export default router;