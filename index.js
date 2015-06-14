#!/usr/bin/env node
'use strict';
var parse = require('./lib/parse');
var git = require('./lib/git');
var prompt = require('./lib/prompt');
require('colors');
var params = process.argv;
var userParams;

parse.parameters(params).then(function(parsedParams){

    return prompt.questions(parsedParams);

}).then(function(result){

    userParams = result;
    return git.add(userParams.files);

}).then(function(){

    return git.commit(userParams.message);

}).then(function(){

    console.log('Files commited');

}).catch(function(err){

    console.log(err.toString().red);

});

