
/**
 * Module dependencies.
 */

var Set = require('rediskit').Set
  , should = require('should')
  , redis = require('redis');

module.exports = {
  '.add(str)': function(done){
    var names = new Set('names');
    names.add('tj');
    names.add('aaron');
    names.add('guillermo');
    should.equal(true, names.card == names.length, 'card() length() alias is missing');
    names.card(function(err, cardinality){
      cardinality.should.equal(3);
      done();
    });
  },
  
  '.rem(str)': function(done){
    var names = new Set('names');
    names.add('tj');
    names.add('aaron');
    names.add('guillermo');
    names.rem('tj');
    should.equal(true, names.rem == names.remove, 'rem() remove() alias is missing');
    names.members(function(err, arr){
      arr.should.eql(['guillermo', 'aaron']);
      done();
    });
  },
  
  '.ismember(str)': function(done){
    var names = new Set('names');
    names.add('tj');
    names.add('aaron');
    names.add('guillermo');
    should.equal(true, names.ismember == names.has, 'ismember() has() alias is missing');
    names.ismember('tj', function(err, yes){
      yes.should.equal(1);
      names.ismember('tobi', function(err, yes){
        yes.should.equal(0);
        done();
      });
    });
  },
  
  '.pop()': function(done){
    var names = new Set('names');
    names.add('tj');
    names.add('aaron');
    names.add('guillermo');
    names.pop(function(err, name){
      name.should.be.a('string');
      names.card(function(err, cardinality){
        cardinality.should.equal(2);
        done();
      });
    });
  },
  
  '.random()': function(done){
    var names = new Set('names');
    names.add('tj');
    names.add('aaron');
    names.add('guillermo');
    names.random(function(err, name){
      name.should.be.a('string');
      names.card(function(err, cardinality){
        cardinality.should.equal(3);
        done();
      });
    });
  },
  
  '.union(str)': function(done){
    var online = new Set('online')
      , offline = new Set('offline');

    online.add('tj');
    online.add('guillermo');
    offline.add('aaron');
    online.union('offline', function(err, res){
      res.should.eql(['guillermo', 'aaron', 'tj']);
      done();
    });
  },
  
  '.union(Set)': function(done){
    var online = new Set('online')
      , offline = new Set('offline');

    online.add('tj');
    online.add('guillermo');
    offline.add('aaron');
    online.union(offline, function(err, res){
      res.should.eql(['guillermo', 'aaron', 'tj']);
      done();
    });
  },
  
  '.diff(str)': function(done){
    var nums = new Set('nums')
      , other = new Set('other');

    nums.destroy();
    other.destroy();
    nums.add(1);
    nums.add(2);
    nums.add(3);
    other.add(2);
    other.add(3);
    nums.diff('other', function(err, res){
      should.equal(null, err);
      res.should.eql(['1']);
      done();
    });
  },
  
  '.diff(Set)': function(done){
    var nums = new Set('nums')
      , other = new Set('other');

    nums.destroy();
    other.destroy();
    nums.add(1);
    nums.add(2);
    nums.add(3);
    other.add(2);
    other.add(3);
    nums.diff(other, function(err, res){
      should.equal(null, err);
      res.should.eql(['1']);
      done();
    });
  },
  
  '.inter(str)': function(done){
    var nums = new Set('nums')
      , other = new Set('other');

    nums.destroy();
    other.destroy();
    nums.add(1);
    nums.add(2);
    nums.add(3);
    other.add(2);
    other.add(3);
    should.equal(true, nums.inter == nums.intersect, 'Set inter() alias intersect() missing');
    nums.inter('other', function(err, res){
      should.equal(null, err);
      res.should.eql(['2', '3']);
      done();
    });
  },
  
  '.inter(Set)': function(done){
    var nums = new Set('nums')
      , other = new Set('other');

    nums.destroy();
    other.destroy();
    nums.add(1);
    nums.add(2);
    nums.add(3);
    other.add(2);
    other.add(3);
    nums.inter(other, function(err, res){
      should.equal(null, err);
      res.should.eql(['2', '3']);
      done();
    });
  }
};