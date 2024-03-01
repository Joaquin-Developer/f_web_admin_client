#!/bin/bash

RESTAPI_PATH=$(dirname "$0")/../backend/src/index.js


function kill_process() {
    echo "Stopping processes..."

    # kill http-server in port 7000
    pid=$(lsof -i :7000 | grep "http-s" | cut -d " " -f2)

    if [ -n "$pid" ]; then
        kill -9 $pid
    fi

    # kill nodejs api in port 5016
    api_pid=$(lsof -i :5016 | grep "node" | cut -d " " -f5)

    if [ -n "$api_pid" ]; then
        kill -9 $api_pid
    fi
}


function cleanup() {
    kill_process
    exit 0;
}


kill_process

# call cleanup on interrupt process (Ctrl+C or Ctrl+D)
trap cleanup INT

echo "Starting..."
bash run.sh & node $RESTAPI_PATH & chromium http://127.0.0.1:7000/ &
