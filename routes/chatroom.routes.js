/**
 * Created by christoffer on 26/04/2017.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = require('../model/chatroom.model');
var database = require('../model/database');

/* POST chatroom */
router.post('/post', function(req, res, next) {
    var instance = new schema.ChatRoom(req.body);

    instance.save(function (err, ChatRoom) {
        result = err?err:ChatRoom;
        res.send(result);
        return result;
    });
});

router.get('/get', function(req, res, next) {
    schema.ChatRoom.find({}).exec(function (err, chatRooms) {
        if (err)
            return console.error(err);
        console.log("Load success: ", chatRooms);
        res.send(chatRooms);
    });

});

//export the router
module.exports = router;