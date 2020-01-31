#!/bin/bash

docker container stop jboss/keycloak && docker rm jboss/keycloak 
docker container stop postgres&& docker rm postgres