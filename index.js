
/**
 * Module dependencies.
 */

var Redis = require('entangle-redis');

/**
 * Expose `Driver`.
 */

module.exports = Driver;

/**
 * Initialize a mongo driver with
 * the given collection object.
 *
 * @param {Object} col
 * @api public
 */

function Driver(col) {
  this.col = col;
  this.buffer = [];
  col.ensureIndex(['id', 1], true, function(){});
  var redis = new Redis;
  this.pub = redis.pub.bind(redis);
  this.sub = redis.sub.bind(redis);
}

/**
 * Load object by `id` and invoke `fn(null, obj)`.
 *
 * @param {String} id
 * @param {Function} fn
 * @api public
 */

Driver.prototype.load = function(id, fn){
  this.col.findOne({ id: id }, function(err, doc){
    if (err || !doc) return fn(err, {});
    fn(null, doc.object);
  });
};

/**
 * Save object by `id` and invoke `fn(err)`.
 *
 * @param {String} id
 * @param {Object} obj
 * @param {Function} [fn]
 * @api public
 */

Driver.prototype.save = function(id, obj, fn){
  fn = fn || function(){};
  var set = { object: obj };
  this.col.update({ id: id }, { $set: set }, true, fn);
};

/**
 * Remove object by `id`.
 *
 * @param {String} id
 * @param {Function} [fn]
 * @api public
 */

Driver.prototype.remove = function(id, fn){
  fn = fn || function(){};
  this.col.remove({ id: id }, fn);
};
