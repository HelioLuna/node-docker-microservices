# Node v7 as the base image to support ES6
FROM node:latest

RUN apt-get update && \
   apt-get install -y --no-install-recommends \
   apt-transport-https \
   ca-certificates \
   curl \
   software-properties-common

RUN curl -fsSL https://apt.dockerproject.org/gpg | apt-key add - && \
  apt-key fingerprint 58118E89F3A912897C070ADBF76221572C52609D && \
  add-apt-repository \
       "deb https://apt.dockerproject.org/repo/ \
       debian-$(lsb_release -cs) \
       main"


RUN apt-get update && \
  apt-get -y install docker-engine

ENV HOME=/home/nupp

COPY package.json package-lock.json $HOME/app/

COPY src/ $HOME/app/src

WORKDIR $HOME/app
RUN npm cache verify && \
    npm install --silent --production


EXPOSE 3000

CMD ["npm", "start"]