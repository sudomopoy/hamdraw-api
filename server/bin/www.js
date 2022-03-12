#!/usr/bin/env node
"use strict";
/* eslint-disable no-console */
/**
 * Module dependencies.
 */
exports.__esModule = true;
var debug_1 = require("debug");
var http_1 = require("http");
var app_1 = require("../app");
var debug = debug_1["default"]('ts/www:server');
/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '3001');
app_1["default"].set('port', port);
/**
 * Create HTTP server.
 */
var server = http_1["default"].createServer(app_1["default"]);
var io = require('socket.io')(server, { cors: { origin: '*' } });
// io.on('connection', (socket:any) => {
//   console.log(`Connection ${socket.id}`);
// });
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, function () {
    console.log("App listening on PORT " + port);
});
server.on('error', onError);
server.on('listening', onListening);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var portNum = parseInt(val, 10);
    if (Number.isNaN(portNum)) {
        // named pipe
        return val;
    }
    if (portNum >= 0) {
        // port number
        return portNum;
    }
    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
// eslint-disable-next-line no-undef
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? "Pipe " + port
        : "Port " + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? "pipe " + addr
        : "port " + addr.port;
    debug("Listening on " + bind);
}
exports["default"] = { socket: io };
