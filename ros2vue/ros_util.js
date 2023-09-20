var express = require('express');

function findROSNodes(node){
    console.log(node.getServiceNamesAndTypes());
}

module.exports = { findROSNodes };
