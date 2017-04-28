/**
 * Created by christoffer on 26/04/2017.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = require('../model/message.model');
var database = require('../model/database');

/* POST single message */
router.post('/post', function(req, res, next) {
    var instance = new schema.Message(req.body);

    instance.save(function (err, Message) {
        result = err?err:Message;
        res.send(result);
        return result;
    });
});

router.get('/get', function(req, res, next) {
    schema.Message.find({}).exec(function (err, messages) {
        if (err)
            return console.error(err);
        console.log("Load success: ", messages);
        res.send(messages);
    });
});

router.get('/get/:roomName', function(req, res, next) {
    schema.Message.find({roomName: req.params.roomName}).exec(function (err, messages) {
        if (err)
            return console.error(err);
        console.log("Load success: ", messages);
        res.send(messages);
    });

});

//export the router
module.exports = router;