
/**
 * Module dependencies.
 */

var String = require('rediskit').String
  , should = require('should')
  , redis = require('redis');

var str = new String('str');

module.exports = {
  str: function(fn){
    str.destroy(fn);
  },

  '.length()': function(done){
    str.set('tj');
    str.length(function(err, len){
      len.should.equal(2);
      done();
    });
  },
  
  '.append(str)': function(done){
    str.set('tj');
    str.append(' holowaychuk');
    str.get(function(err, val){
      val.should.equal('tj holowaychuk');
      done();
    });
  },
  
  'range': function(done){
    str.set('tj holowaychuk');
    str.range(0, 1, function(err, str){
      str.should.equal('tj');
      done();
    });
  },
  
  after: function(){
    str.client.end();
  }
};