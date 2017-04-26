/**
 * Created by christoffer on 26/04/2017.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schema = require('../model/user.model');
var database = require('../model/database');

/* POST single user */
router.post('/post', function(req, res, next) {
    var instance = new schema.User(req.body);
    /** Example post body:
     {
       "username": "Christoffer"
     }
     **/
    instance.save(function (err, User) {
        result = err?err:User;
        res.send(result);
        return result;
    });
});

//export the router
module.exports = router;