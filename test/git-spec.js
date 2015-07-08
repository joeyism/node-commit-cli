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

        it('should successfully commit given files', function(done){
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

    describe('getCurrentBranch', function(){

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

        it('should successfully return the current branch the user is on', function(done){
            mockery.registerMock('child_process', fakeChild(null, 'develop\n'));
            git = require('../lib/git');
            git.getCurrentBranch().then(function(currentBranch){
                expect(currentBranch).to.equal('develop');
                done();
            });       
        });

        it('should throw an error when getting current branch throws an error', function(done){
            mockery.registerMock('child_process', fakeChild('error','whatever'));
            git = require('../lib/git');
            git.getCurrentBranch().catch(function(error){
                expect(error).to.equal('error');
                done();
            });       
        });
    });

    describe('haveFilesToCommit', function(){

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

        it('should successfully return success since there are files to commit', function(done){
            mockery.registerMock('child_process', fakeChild(null, 'there are files to commmit\n'));
            git = require('../lib/git');
            git.haveFilesToCommit().then(function(){
                done();
            });       
        });

        it('should throw an error when there are no files to commit', function(done){
            mockery.registerMock('child_process', fakeChild(null,'blahblahblah\nnothing to commit\n'));
            git = require('../lib/git');
            git.haveFilesToCommit().catch(function(error){
                expect(error).to.equal('There are no files to commit');
                done();
            });       
        });
        
        it('should throw an error when getting current branch throws an error', function(done){
            mockery.registerMock('child_process', fakeChild('error','whatever'));
            git = require('../lib/git');
            git.haveFilesToCommit().catch(function(error){
                expect(error).to.equal('error');
                done();
            });       
        });
    });

    describe('showFilesAdded', function(){
        
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

        it('should correctly display files added', function(done){
            var result ='On branch master\nChanges to be committed:\n  (use "git reset HEAD <file>..." to unstage)\n\n\tmodified:   README.md\n\n' ;
            mockery.registerMock('child_process', fakeChild(null, result));
            git = require('../lib/git');
            git.showFilesAdded().then(function(result){
                expect(result).to.equal('\tmodified:   README.md');
                done();
            });             
        });
    });
});
