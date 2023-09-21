var express = require('express');
var router = express.Router();
const ros_util = require('../ros_util.js');

/* GET existing ROS Nodes and Services. */
router.get('/', function(req, res, next) {
    // respond with json
    res.json(ros_util.findROSNodes());
});

module.exports = router;
