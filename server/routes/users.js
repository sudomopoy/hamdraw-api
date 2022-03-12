"use strict";
exports.__esModule = true;
var express_1 = require("express");
var userController = require("../controllers/userController");
var router = express_1["default"].Router();
/* GET all users */
router.get('/', userController.getAllUsers);
exports["default"] = router;
