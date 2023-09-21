var express = require('express');
const rclnodejs = require('rclnodejs');
const shell = require('shelljs');
const { param } = require('./routes');
var ros_node;

rclnodejs.init().then(() => {
    ros_node = new rclnodejs.Node('ros2vue_node');
    console.log('ROS2Vue Node Initialized');
    findROSNodes();
});

// Example service interface description:
// float32 x
// float32 y
// float32 theta
// string name # Optional.  A unique name will be created and returned if this is empty
// ---
// string name

function parse_interface_description(interface_description){
    var interface = {request_params: {}, response_params: {}};
    // Split the interface description into request and response
    var interface_description_split = interface_description.split('---');
    var request = interface_description_split[0];
    var response = interface_description_split[1];
    // Split the request into lines
    var request_split = request.split('\n');
    // Split the response into lines
    var response_split = response ? response.split('\n') : [];
    request_split.forEach((line) => {
        if (line) {
            var [type, name, ...comment] = line.split(' ');
            comment = comment.join(' ');
            var optional = comment.includes('# Optional.');
                interface.request_params[name] = {type: type, comment: comment, optional: optional};
        }
    });
    response_split.forEach((line) => {
        if (line) {
            var [type, name, ...comment] = line.split(' ');
            comment = comment.join(' ');
            interface.response_params[name] = {type: type, comment: comment};
        }
    });
    return interface;
}

function get_service_interface_description(service_name){
    // Call the ros2 service show command:
    return shell.exec("ros2 interface show " + service_name).stdout
}
parse_interface_description(get_service_interface_description("turtlesim/srv/Spawn"))

function findROSNodes(){
    return ros_node.getServiceNamesAndTypes()
}

function get_all_service_interfaces(){
    var service_interfaces = {};
    var services = findROSNodes();
    services.forEach((service) => {
        service_interfaces[service.name] = parse_interface_description(get_service_interface_description(service.types[0]));
    });
    return service_interfaces;
}

function findROSTopics(){
    return ros_node.getTopicNamesAndTypes()
}

// // Get list of services and then create an array of client objects
// function createClients(){
//     ros_node.getServiceNamesAndTypes().then((services) => {
//         services.forEach((service) => {
//             ros_node.createClient(service.name, service.types[0]);
//         });
//     });
// }

module.exports = { 
    findROSNodes,
    findROSTopics,
    get_all_service_interfaces,
};
