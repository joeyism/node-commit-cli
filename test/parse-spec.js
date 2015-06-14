'use strict';
var parse = require('../lib/parse');
var expect = require('chai').expect;

describe('parse', function(){

    describe('parameters', function(){

        it('should return an object if files are included, after parsing parameters', function(done){
            parse.parameters(['node','index','file1.js','file2.js','message']).then(function(result){
                expect(result).to.deep.equal({ message: 'message', files: 'file1.js file2.js' });
                done();
            });
        });
        
        it('should return an object even if files arent included, after parsing parameters', function(done){
            parse.parameters(['node','index','message']).then(function(result){
                expect(result).to.deep.equal({ message: 'message', files: '.' });
                done();
            });
        });
    });
});
