const express = require('express')
const router = express.Router();

const User = require('../models/user')
const Message = require('../models/message')

/** Route to get all messages. */
router.get('/', (req, res) => {
    // TODO: Get all Message objects using `.find()`
    Message.find().then(() => {
            return res.json(messages)
        })
        .catch((err) => {
            throw err.message
        })
        // TODO: Return the Message objects as a JSON list
        // let m = JSON.parse(message)
})

/** Route to get one message by id. */
router.get('/:messageId', (req, res) => {
        // TODO: Get the Message object with id matching `req.params.id`
        // using `findOne`
        Message.findOne({ _id: req.params.Id })
            .then(() => {
                return res.json(messages)
            }).catch((err) => {
                throw err.message
            })
            // TODO: Return the matching Message object as JSON
    })
    /** Route to add a new message. */
router.post('/', (req, res) => {
    let message = new Message(req.body)
    message.save()
        .then(message => {
            return User.findById(message.author)
        })
        .then(user => {
            // console.log(user)
            user.messages.unshift(message)
            return user.save()
        })
        .then(() => {
            return res.send(message)
        }).catch(err => {
            throw err.message
        })
})

/** Route to update an existing message. */
router.put('/:messageId', (req, res) => {
    // TODO: Update the matching message using `findByIdAndUpdate`
    Message.findByIdAndUpdate(req.params.messageId, req.body)
        .then(updatedMessage => {
            // Return the updated Message object as JSON
            return res.send(updatedMessage)
        })
        .catch(err => {
            throw err.message
        })
})

// TODO: Return the updated Message object as JSON
/** Route to delete a message. */
router.delete('/:messageId', (req, res) => {
    // TODO: Delete the specified Message using `findByIdAndDelete`. Make sure
    // to also delete the message from the User object's `messages` array
    Message.findByIdAndDelete(req.params.messageId)
        .then((message) => {
            return res.json(message)
        })
        .catch((err) => {
            console.log(err)
        })
        // TODO: Return a JSON object indicating that the Message has been deleted
})

module.exports = router