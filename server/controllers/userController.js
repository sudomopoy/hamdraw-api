"use strict";
exports.__esModule = true;
exports.getAllUsers = void 0;
var models_1 = require("../models");
exports.getAllUsers = function (req, res, next) {
    models_1.User.find().then(function (data) {
        res.send({ name: 'User Route', data: data });
    })["catch"](function (err) { return next(err); });
};
