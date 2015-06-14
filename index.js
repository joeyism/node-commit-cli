#!/usr/bin/env node
'use strict';
var parse = require('./lib/parse');
var git = require('./lib/git');
require('colors');
var params = process.argv;
var userParams;

parse.parameters(params).then(function(parsedParams){

    userParams = parsedParams;
    return git.add(parsedParams.files);

}).then(function(){

    return git.commit(userParams.message);

}).then(function(){

    console.log('Files commited');

}).catch(function(err){

    console.log(err.toString().red);

});

