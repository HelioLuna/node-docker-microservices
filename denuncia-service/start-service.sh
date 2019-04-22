#!/usr/bin/env bash

eval 'docker-machine env manager1'

docker rm -f denuncia-service

docker rmi denuncia-service

docker image prune

docker build -t denuncia-service .

docker run --name denuncia-service -l=apiRoute='/denuncias' -p 3001:3000 --env-file .env -d denuncia-service