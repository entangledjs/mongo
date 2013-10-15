
# entangle-mongo

  Mongo / Redis hybrid driver for entangle. Pubsub via Redis.
  Configuration is delegated to your mongo driver of choice.

## Installation

```
$ npm install entangle-mongo
```

## Example

```js
var mongo = require('mongoskin');

// mongo connection
var db = mongo.db('localhost:27017/entangle', { safe: true });

// driver
var Mongo = require('entangle-mongo');
var driver = new Mongo(db.collection('entangle'));

// use it
var object = require('entangle')(driver);
var config = object('config');
```

# License

  MIT