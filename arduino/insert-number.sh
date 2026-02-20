#!/bin/bash
echo $1
exec 3>/dev/ttyACM0
sleep 2
echo -ne "$1\n" >&3
exec 3>&-