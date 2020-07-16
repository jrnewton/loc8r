#!/bin/bash 

#Make sure mongo is running
#  sudo systemctl status mongod
#Start it
#  sudo systemctl start mongod

#Start web server. This command was provided by express generator 
DEBUG=meanwifi:* npm start
