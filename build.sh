#!/usr/bin/env bash

lein uberjar

cp /target/uberjar/workflow-shell-0.1.0-SNAPSHOT-standalone.jar /target/uberjar/wsh
