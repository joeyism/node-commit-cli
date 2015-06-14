'use strict';
var mockery = require('mockery');
var expect = require('chai').expect;
var git;

var fakeChild = function(error, result){
    return {
        exec: function(cmd, callback){
            callback(error, result);
        }
    };
};

describe('git', function(){

    describe('add', function(){

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

        it('should successfully add given files', function(done){
            mockery.registerMock('child_process', fakeChild(null, 'doesnt matter'));
            git = require('../lib/git');
            git.add('fake.file').then(function(result){
                expect(result).to.be.undefined;
                done();
            });
        });

        it('should throw an error if exec throws an error', function(done){
            mockery.registerMock('child_process', fakeChild('error', 'doesnt matter'));
            git = require('../lib/git');
            git.add('fake.file').catch(function(err){
                expect(err).to.equal('error');
                done();
            });
        });
    });

    describe('commit', function(){

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

        it('should successfully add given files', function(done){
            mockery.registerMock('child_process', fakeChild(null, 'doesnt matter'));
            git = require('../lib/git');
            git.commit('message').then(function(result){
                expect(result).to.be.undefined;
                done();
            });
        });

        it('should throw an error if exec throws an error', function(done){
            mockery.registerMock('child_process', fakeChild('error', 'doesnt matter'));
            git = require('../lib/git');
            git.commit('message').catch(function(err){
                expect(err).to.equal('error');
                done();
            });
        });
    });
});
