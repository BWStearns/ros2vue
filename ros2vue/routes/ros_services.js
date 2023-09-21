var express = require('express');
var router = express.Router();
const ros_util = require('../ros_util.js');

/* GET existing ROS Nodes and Services. */
router.get('/services', function(req, res, next) {
    // respond with json
    res.json(ros_util.get_all_service_interfaces());
});

router.get('/topics', function(req, res, next) {
    // respond with json
    res.json(ros_util.findROSTopics());
});

module.exports = router;
