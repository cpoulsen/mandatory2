var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var schemaUser = require('../model/user.model');
var schemaMessage = require('../model/message.model');
var schemaChatroom = require('../model/chatroom.model');
var database = require('../model/database');


describe('Testing that a new user can be created', function() {
    it('Will pass if a new user is created', function(done) {
        var newUser = schemaUser.User ({
            username : 'JohnDoe'
        });
        newUser.save(done);
    });
});

describe('Testing that the system can fetch messages', function() {
    it('Will pass if any messages are found in the database & if they returned as arrays', function(done) {
        //Look up the 'username' object previously saved.
        var should = require('chai').should();
        schemaMessage.Message.find({}, (err, data) => {
        data.should.be.an('array');
        if(err) {throw err;}
            if(data.length === 0) {throw new Error('No data!');}
        done();
        });
    });
});

describe('Testing that the system can find a specific user', function() {
    it('Will pass if JohnDoe is found in the database', function(done) {
        //Look up the 'username' object previously saved.
        var should = require('chai').should();
        schemaUser.User.find({username: "JohnDoe"}, (err, data) => {
        if(err) {throw err;}
        if(data.length === 0) {throw new Error('No data!');}
        done();
        });
    });
});


//expect(foo).to.be.a('number');


//var expect = require('chai').expect
//, foo = 'bar';
//expect(foo).to.be.a('number');