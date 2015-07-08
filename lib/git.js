'use strict';
var Promise = require('promise');
var exec = require('child_process').exec;
require('colors');

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

var commit = function(message, options){
    options = options || "";
    return new Promise(function(resolve, reject){
        exec('git commit ' + options + ' -m \"' + message + '\"', function(err){
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

var haveFilesToCommit = function(){
    return new Promise(function(resolve, reject){ 
        exec('git status', function(err, result){
            if (err){
                reject(err);
            }
            else {
                result = result.split("\n")
                result.pop();
                if (result.pop().indexOf('nothing to commit') > -1){
                    reject('There are no files to commit');
                }
                else {
                    resolve();
                }
            }
        });
    });
};

var showFilesAdded = function(){
    return new Promise(function(resolve, reject){
        exec('git status', function(err, result){
            if(err){
                reject(err);
            }
            else {
                var filesAdded = [];
                result = result.split("\n");
                result.forEach(function(line){
                    if(line.indexOf('\t') > -1){
                        filesAdded.push(line);
                    }
                });
                resolve(filesAdded.join("\n"));
            }
        });
    });
}; 

module.exports = {
    haveFilesToCommit: haveFilesToCommit,
    add: add,
    getCurrentBranch: getCurrentBranch,
    showFilesAdded: showFilesAdded,
    commit: commit
};
