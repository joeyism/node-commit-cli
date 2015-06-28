'use strict';
var parse = require('../lib/parse');
var expect = require('chai').expect;

describe('parse', function(){

    describe('parameters', function(){

        it('should return an object if files are included, after parsing parameters', function(done){
            parse.parameters(['node','commit','file1.js','file2.js','-m','message to commit']).then(function(result){
                expect(result).to.deep.equal({ message: 'message to commit', files: 'file1.js file2.js' });
                done();
            });
        });

        it('should return an object if files are not included, after parsing parameters', function(done){
            parse.parameters(['node','commit','-m','message to commit']).then(function(result){
                expect(result).to.deep.equal({ message: 'message to commit', files: undefined });
                done();
            });
        });

        it('should return an object if files are not included and no message is provided, after parsing parameters', function(done){
            parse.parameters(['node','commit','-m']).then(function(result){
                expect(result).to.deep.equal({ message: undefined, files: undefined });
                done();
            });
        });

        it('should return an object if message isnt included, after parsing parameters', function(done){
            parse.parameters(['node','commit','file1.js','file2.js']).then(function(result){
                expect(result).to.deep.equal({ message: undefined, files: 'file1.js file2.js'});
                done();
            });
        });
    });
});
