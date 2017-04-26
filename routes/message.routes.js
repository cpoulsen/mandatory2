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

//export the router
module.exports = router;