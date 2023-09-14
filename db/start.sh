#!/bin/bash

#Accept arguments
args="$@"

#Start Postgres and Flyway
docker compose up $args
