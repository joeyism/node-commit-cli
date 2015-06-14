'use strict';
var inq = require('inquirer');
var Promise = require('promise');

var questions = function(alreadyAnswered){

    return new Promise(function(resolve){
        inq.prompt([
            {
                when: function(){
                    return (alreadyAnswered.files === undefined);
                },
                name: 'files',
                type: 'input',
                default: '--all',
                message: 'Please input the files you want to commit: '
            },
            {
                when: function(){
                    return (alreadyAnswered.message === undefined);
                },
                name: 'message',
                type: 'input',
                message: 'Please input the message you want to commit: '
            }
        ], function(answers){
            resolve({
                files: alreadyAnswered.files || answers.files,
                message: alreadyAnswered.message || answers.message
            });
        });
    });
};

module.exports = {
    questions: questions
};
