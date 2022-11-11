
import { io } from 'socket.io-client';

let websocket, lockReconnect = false;

let createWebSocket = (url) => {

    websocket = io(url);
    websocket.onopen = function () {
       heartCheck.reset().start();
    }
    websocket.onerror = function (e) {
        console.log("Websocket error", e);
        reconnect(url);
    };
    websocket.onclose = function (e) {
        console.log('websocket close: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
    }
    websocket.onmessage = function (event) {
        lockReconnect=true;
        //event 为服务端传输的消息，在这里可以处理
    }
}

let reconnect = (url) => {
    if (lockReconnect) return;
    //没连接上会一直重连，设置延迟避免请求过多
    setTimeout(function () {
        createWebSocket(url);
        lockReconnect = false;
    }, 100000);
}

let heartCheck = {
    timeout: 600000, //60秒
    timeoutObj: null,
    reset: function () {
        clearInterval(this.timeoutObj);
        return this;
    },
    start: function () {
        this.timeoutObj = setInterval(function () {
            //这里发送一个心跳，后端收到后，返回一个心跳消息，
            //onmessage拿到返回的心跳就说明连接正常
            websocket.send("HeartBeat");
        }, this.timeout)
    }
}
//关闭连接
let closeWebSocket=()=> {
    websocket && websocket.close();
}

export {
    websocket,
    createWebSocket,
    closeWebSocket
};

