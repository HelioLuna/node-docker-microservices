#!/usr/bin/env bash

eval 'docker-machine env manager1'  

docker rm -f api-gateway

docker rmi api-gateway

docker image prune

docker build -t api-gateway .

docker run --name api-gateway -v certificates://certs --net='host' --env-file .env -d api-gateway