#!/usr/bin/env bash
SCRIPTPATH="$( cd "$(dirname "$0")" ; pwd -P )"

lein uberjar

cp "$SCRIPTPATH/target/uberjar/workflow-shell-0.1.0-SNAPSHOT-standalone.jar" "$SCRIPTPATH/target/uberjar/wsh"

echo "\n"
echo "\n"

wsh -h