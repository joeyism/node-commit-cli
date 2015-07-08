#!/usr/bin/env node
'use strict';
var parse = require('./lib/parse');
var git = require('./lib/git');
var prompt = require('./lib/prompt');
var Promise = require('promise');
require('colors');

var params = process.argv;
var userParams = params[2];

var promise = new Promise(function(resolve){
    
    prompt.recommit(parsedParams).then(function(result){

        userParams = result;
        userParams= userParams.replace("$BR", currentBranch);
        return git.recommit(userParams,"--amend");

    }).then(function(){

        resolve();
        console.log('Files commited');

    }).catch(function(err){

        resolve();
        console.log(err.toString().red);

    });
});

module.exports = promise;
