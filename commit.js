#!/usr/bin/env node
'use strict';
var parse = require('./lib/parse');
var git = require('./lib/git');
var prompt = require('./lib/prompt');
var Promise = require('promise');
require('colors');

var params = process.argv;
var userParams;

var promise = new Promise(function(resolve){
    
    git.haveFilesToCommit().then(function(){

        return parse.parameters(params);

    }).then(function(parsedParams){

        return prompt.questions(parsedParams);

    }).then(function(result){

        userParams = result;
        return git.add(userParams.files);

    }).then(function(){

        return git.showFilesAdded()

    }).then(function(files){

        console.log('These are the files to be commited: \n'.yellow);
        console.log(files);
        return git.getCurrentBranch();

    }).then(function(currentBranch){

        userParams.message = userParams.message.replace("$BR", currentBranch);
        return git.commit(userParams.message);

    }).then(function(){

        resolve();
        console.log('Files commited');

    }).catch(function(err){

        resolve();
        console.log(err.toString().red);

    });
});

module.exports = promise;
