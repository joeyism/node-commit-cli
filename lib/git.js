'use strict';
var Promise = require('promise');
var exec = require('child_process').exec;

var add = function(files){
    return new Promise(function(resolve, reject){
        exec('git add ' + files, function(err){
            if (err){
                reject(err);
            }
            else {
                resolve();
            }
        }); 
    });
};

var commit = function(message){
    return new Promise(function(resolve, reject){
        exec('git commit -m \"' + message + '\"', function(err){
            if(err){
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
};

module.exports = {
    add: add,
    commit: commit
};
