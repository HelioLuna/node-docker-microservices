#!/usr/bin/env bash

eval 'docker-machine env manager1'

docker rm -f municipio-service

docker rmi municipio-service

docker image prune

docker build -t municipio-service .

docker run --name municipio-service -l=apiRoute='/municipios' -p 3003:3000 --env-file .env -d municipio-service