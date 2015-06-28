'use strict';
var Promise = require('promise');


var parameters = function(params){
    var files, message;

    params.splice(0,2);
    var indexOfMessage = params.indexOf('-m'); 

    if (indexOfMessage > -1){
        files = params.splice(0, indexOfMessage).join(" ");
        
        message = params;
        message.shift();
        message = message.shift();
    }
    else {
       files = params.join(" "); 
    }
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
