const lazyExpiry = require('../lib/index.js').lazyExpiry; 
const assert = require('assert');

function t(ms) {
  return new Promise(function(resolve, reject) {
    setTimeout(resolve, ms);
  });
}

describe('Basic lazy expiration', function() {
  it("should expire value", function(done) {
    var c = 1

    function gen() {
      let expiresIn = 100 // ms
      return [c++, expiresIn]
    }
    var v = lazyExpiry(gen);
    assert.equal(v(), "1", "initial value");
    t(10).then(() => {
      assert.equal(v(), "1", "snd value")
      return t(10)
    }).then(() => {
      assert.equal(v(), "1", "thrd value")
      return t(100)
    }).then(() => {
      assert.equal(v(), "2", "after 100 ms should gen next value")
    }).then(done)
  });
});


