FROM osrf/ros:iron-desktop

SHELL ["/bin/bash", "-c"]

ADD . /ros2vue

RUN echo "source  opt/ros/iron/setup.bash" > startup.bash

ENV NODE_MAJOR=20

RUN apt-get update
RUN apt-get install tree

# Node installation
RUN apt-get update 
RUN apt-get install -y ca-certificates curl gnupg 
RUN mkdir -p /etc/apt/keyrings 
RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg 
RUN echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list  
RUN apt-get update 
RUN apt-get install nodejs -y

# Expose port 3000
EXPOSE 3000/tcp

RUN echo "node ros2vue/ros2vue/bin/www" > startRos2Vue.bash
RUN echo "source /opt/ros/iron/setup.sh" >> startRos2Vue.bash

# RUN cd /ros2vue/ros2vue && yarn install
ENTRYPOINT [ "/ros_entrypoint.sh" ]
CMD [ "bash" ]
