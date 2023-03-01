'use strict';

const mongoose = require('mongoose');
const {
  db: { host, port, name },
} = require('../config/config.mongodb');
mongoose.set('strictQuery', false);
const connectString = `mongodb://${host}:${port}/${name}`;
console.log(connectString);
//lam sao de xac dinhj luong so luong user ket no mongo

class Database {
  constructor() {
    this.connect();
  }

  //connect

  connect(type = 'mongodb') {
    if (1 === 1) {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

    mongoose
      .connect(connectString)
      .then((_) => {
        console.log(`Connect mongoose success::::`);
      })
      .catch((err) => console.log(`error connect`, err));
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
