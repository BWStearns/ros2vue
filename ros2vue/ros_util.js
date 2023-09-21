var express = require('express');
const rclnodejs = require('rclnodejs');

var ros_node;

rclnodejs.init().then(() => {
    ros_node = new rclnodejs.Node('ros2vue_node');
    console.log('ROS2Vue Node Initialized');
    findROSNodes();
});

function findROSNodes(){
    nodesandservices = ros_node.getServiceNamesAndTypes();
    return nodesandservices
}

module.exports = { 
    findROSNodes,
};
