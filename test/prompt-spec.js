'use strict';
var mockery = require('mockery');
var expect = require('chai').expect;
var prompt;

describe('prompt', function(){

    describe('questions', function(){

        beforeEach(function(done){
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true
            });
            done();
        });

        afterEach(function(done){
            mockery.resetCache();
            mockery.deregisterAll();
            done();
        });    

        it('should successfully return answers of user prompts when there are no user inputs', function(done){
            var answer = {
                files: 'thisfile.js',
                message: 'commit message'
            }; 
            var mockInq = {
                prompt: function(question, callback){
                    callback(answer);
                }
            };
            mockery.registerMock('inquirer', mockInq);
            prompt = require('../lib/prompt');
            prompt.questions({}).then(function(result){
                expect(result).to.deep.equal(answer);
                done();
            });
        });

        it('should successfully return answers of user prompts when there are all user inputs', function(done){
            var answer = {
                files: 'thisfile.js',
                message: 'commit message'
            }; 
            var mockInq = {
                prompt: function(question, callback){
                    callback({});
                }
            };
            mockery.registerMock('inquirer', mockInq);
            prompt = require('../lib/prompt');
            prompt.questions(answer).then(function(result){
                expect(result).to.deep.equal(answer);
                done();
            });
        });
    });
    
    describe('recommit', function(){

        beforeEach(function(done){
            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false,
                useCleanCache: true
            });
            done();
        });

        afterEach(function(done){
            mockery.resetCache();
            mockery.deregisterAll();
            done();
        });    

        it('should successfully return answers of user prompts when there are no user inputs', function(done){
            var answer = {
                message: 'commit message'
            }; 
            var mockInq = {
                prompt: function(question, callback){
                    callback(answer);
                }
            };
            mockery.registerMock('inquirer', mockInq);
            prompt = require('../lib/prompt');
            prompt.recommit(undefined).then(function(result){
                expect(result).to.deep.equal("commit message");
                done();
            });
        });

        it('should successfully return answers of user prompts when there are all user inputs', function(done){
            var answer = {
                message: 'commit message'
            }; 
            var mockInq = {
                prompt: function(question, callback){
                    callback(answer);
                }
            };
            mockery.registerMock('inquirer', mockInq);
            prompt = require('../lib/prompt');
            prompt.recommit("commit message").then(function(result){
                expect(result).to.deep.equal("commit message");
                done();
            });
        });
    });
});
