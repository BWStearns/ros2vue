# ROS2VUE README

## 1. Introduction

This application runs alongside a ROS2 network, queries the ROS2 network for topics and services, and provides a web interface for viewing and interacting with the ROS2 network.

## 2. Demo

```
docker build -t ros2vue .
docker run -p 3000:3000/tcp -v $(pwd):/r2v-src --rm -it ros2vue
```
