function lazyExpiry(gen) { 
  var reference = null
  var expiry = null
  return function () {
    let exp = expiry,
      ref = reference
    if (ref !== null && exp !== null && exp > Date.now()) {
      return ref
    }

    var val = gen()

    if (!val && val.length !== 2 && (typeof val[1] === 'number')) {
      throw new Error('Expected return value of generator to be an array of two values, where the last value is a number (representing when it expires).')
    }

    ref = reference = val[0]
    exp = expiry = new Date(Date.now() + val[1])
    return ref
  }
}
module.exports = {
  lazyExpiry:lazyExpiry 
}

