
/**
 * Module dependencies.
 */

var List = require('rediskit').List
  , should = require('should')
  , redis = require('redis');

var pets = new List('pets');

module.exports = {
  setup: function(fn){
    pets.destroy(fn);
  },

  '.rpush(str)': function(done){
    pets.rpush('tobi');
    pets.rpush('loki');
    pets.rpush('jane');
    pets.length(function(err, len){
      should.equal(null, err);
      len.should.equal(3);
      pets.rpop(function(err, pet){
        pet.should.equal('jane');
        done();
      });
    });
  },
  
  '.lpush(str)': function(done){
    pets.lpush('tobi');
    pets.lpush('loki');
    pets.lpush('jane');
    pets.length(function(err, len){
      should.equal(null, err);
      len.should.equal(3);
      pets.lpop(function(err, pet){
        pet.should.equal('jane');
        done();
      });
    });
  },
  
  '.range(start, stop)': function(done){
    pets.rpush('tobi');
    pets.rpush('loki');
    pets.rpush('jane');
    pets.rpush('ewald');
    pets.rpush('bandit');
    pets.range(1, 3, function(err, pets){
      pets.should.eql(['loki', 'jane', 'ewald']);
      done();
    });
  },
  
  '.trim(start, stop)': function(done){
    pets.rpush('tobi');
    pets.rpush('loki');
    pets.rpush('jane');
    pets.rpush('ewald');
    pets.rpush('bandit');
    pets.trim(1, 3, function(err){
      pets.range(0, -1, function(err, pets){
        pets.should.eql(['loki', 'jane', 'ewald']);
        done();
      });
    });
  },
  
  '.remove(count, value)': function(done){
    pets.rpush('tobi');
    pets.rpush('loki');
    pets.rpush('jane');
    pets.rpush('jane');
    pets.rpush('jane');
    pets.remove(2, 'jane', function(err, removed){
      removed.should.equal(2);
      pets.length(function(err, len){
        len.should.equal(3);
        done();
      });
    });
  },
  
  '.all()': function(done){
    pets.rpush('tobi');
    pets.rpush('loki');
    pets.all(function(err, pets){
      pets.should.eql(['tobi', 'loki']);
      done();
    });
  },
  
  '.index()': function(done){
    pets.rpush('tobi');
    pets.rpush('loki');
    should.equal(true, pets.at == pets.index, 'index() at() alias missing');
    pets.index(1, function(err, pet){
      pet.should.equal('loki');
      done();
    });
  }
};