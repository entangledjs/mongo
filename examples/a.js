
// $ node --harmony examples/a

var mongo = require('mongoskin');

var db = mongo.db('localhost:27017/entangle', { safe: true });

var Mongo = require('..');
var driver = new Mongo(db.collection('entangle'));
var object = require('entangle')(driver);

var config = object('config');

config.on('change', function(){
  console.log(config.title);
});