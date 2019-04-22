#!/usr/bin/env bash

eval 'docker-machine env manager1'

docker rm -f nota-service

docker rmi nota-service

docker image prune

docker build -t nota-service .

docker run --name nota-service -l=apiRoute='/notas' -p 3006:3000 --env-file .env -d nota-service