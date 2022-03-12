"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = express_1["default"].Router();
/* GET home page. */
router.get('/', function (_, res) {
    res.send('Hello from Generate-Express');
});
exports["default"] = router;
