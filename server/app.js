"use strict";
exports.__esModule = true;
/* eslint-disable no-console */
var express_1 = require("express");
var compression_1 = require("compression");
var cookie_parser_1 = require("cookie-parser");
var cors_1 = require("cors");
var helmet_1 = require("helmet");
var morgan_1 = require("morgan");
var mongoose_1 = require("mongoose");
var redis_1 = require("redis");
var routes = require("./routes");
var app = express_1["default"]();
// database setup
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/mydb';
var mongooseConfigs = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose_1["default"].connect(mongoUri, mongooseConfigs);
/**
* Redis Setup. For more options for redis client, go to: https://www.npmjs.com/package/redis#options-object-properties
*/
var redisPort = parseInt(process.env.REDIS_PORT) || 6379;
var redisHost = process.env.REDIS_HOST || '127.0.0.1';
var redisClient = redis_1["default"].createClient(redisPort, redisHost);
redisClient.on('error', function (error) {
    console.error(error);
    console.log('[33m%s[0m', 'Make sure redis is installed and running.');
});
redisClient.on('connect', function () {
    console.log("Redis connected in port: " + redisPort);
});
// --------------End of Redis Setup-----------------------
app.use(morgan_1["default"]('dev'));
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: false }));
app.use(cookie_parser_1["default"]());
app.use(helmet_1["default"]());
app.use(cors_1["default"]());
app.use(compression_1["default"]());
app.use('/api', routes.hello);
app.use('/api/users', routes.users);
exports["default"] = app;
