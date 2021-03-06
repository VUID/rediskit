
/**
 * Module dependencies.
 */

var String = require('rediskit').String
  , Key = require('rediskit').Key
  , should = require('should')
  , redis = require('redis');

var name = new String('name');

module.exports = {
  setup: function(fn){
    name.destroy(fn);
  },

  '.type()': function(done){
    name.set('wahoo');
    name.type(function(err, type){
      type.should.equal('string');
      done();
    });
  },

  '.ttl()': function(done){
    name.ttl(function(err, seconds){
      seconds.should.equal(-1);
      done();
    });
  },

  '.rename(name, fn)': function(done){
    var name = new String('name');
    name.set('tj');
    name.rename('username', function(err){
      should.equal(null, err);
      name.key.should.equal('username');
      done();
    });
  }
};