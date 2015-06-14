'use strict';
var Promise = require('promise');

var parameters = function(params){
    params.splice(0,2);
    var message = params.pop();
    var files = params.join(" ");
    return new Promise(function(resolve){
        resolve({
            message: message, 
            files: (files.length > 0) ? files : undefined
        });
    });
};


module.exports = {
    parameters: parameters
};
