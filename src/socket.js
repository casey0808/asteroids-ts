import { io } from 'socket.io-client';
import { baseUrl } from './apis';
var socket = io(baseUrl);
var engine = socket.io.engine;

socket.on('connect', () => {
  // const engine = socket.io.engine;
  // console.log(engine.transport.name); // in most cases, prints "polling"
  // console.log('socket:', socket.connected); // true
  // engine.once('upgrade', () => {
  //   // called when the transport is upgraded (i.e. from HTTP long-polling to WebSocket)
  //   console.log(engine.transport.name); // in most cases, prints "websocket"
  // });
  // engine.on('packet', ({ type, data }) => {
  //   // called for each packet received
  //   // console.log(type);
  //   // lockReconnect = true
  //   // return JSON.parse(data.slice(1) || '[]')[1];
  // });
});


// socket.on('tick', (res) => {

//   var result;

//   // console.log('tick====>', res);
  
//   var getData = function (type) {
//     return res && res[type]
//   };
// })



socket.on('disconnect', () => {
  console.log('socket disconnected');
});

export { socket };
