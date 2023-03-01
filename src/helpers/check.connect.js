'use strict';

const mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const _SECONDS = 5000;
//count connect
const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log(`Number of connection :::${numConnection}`);
};
//check overload server => notify
const checkOverload = () => {
  setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    // thí dụ máy chiu được 5 connection của mongodb
    const maxConnections = numCores * 5;

    //console.log(`Active connections:::`, numConnection)
    //console.log(`Memory usage:::${memoryUsage / 1024 / 1024} MB`)

    if (numConnection > maxConnections) {
      console.log(`Connection overload detected!`);
      //notify.send(....)
    }
  }, _SECONDS); // Mornitor every in 5s
};

//k biết chính xác một cpu có thể cho kết nối bao nhiêu user

//có nên disconnect() liên tục k

//poolsize??? vì sao lại quan trọng

//nếu vượt qua kết nối poolsize

module.exports = {
  countConnect,
  checkOverload,
};
