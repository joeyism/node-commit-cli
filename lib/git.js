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

var getCurrentBranch = function(){
    return new Promise(function(resolve, reject){
        exec('git rev-parse --abbrev-ref HEAD', function(err, result){
            if(err){
                reject(err);
            }
            else {
                resolve(result.split("\n").join(""));
            }
        }); 
    });
};

module.exports = {
    add: add,
    getCurrentBranch: getCurrentBranch,
    commit: commit
};
