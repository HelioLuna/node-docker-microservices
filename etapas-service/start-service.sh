#!/usr/bin/env bash

eval 'docker-machine env manager1'

docker rm -f etapa-service

docker rmi etapa-service

docker image prune

docker build -t etapa-service .

docker run --name etapa-service -l=apiRoute='/etapas' -p 3002:3000 --env-file .env -d etapa-service