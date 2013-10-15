
// $ node --harmony examples/b

var mongo = require('mongoskin');

var db = mongo.db('localhost:27017/entangle', { safe: true });

var Mongo = require('..');
var driver = new Mongo(db.collection('entangle'));
var object = require('entangle')(driver);

var config = object('config');

var titles = [
  'Hello',
  'World',
  'Some',
  'Stuff'
];

setInterval(function(){
  config.title = titles[Math.random() * titles.length | 0];
}, 500);

config.on('change', function(){
  console.log(config.title);
});