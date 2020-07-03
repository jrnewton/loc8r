# Dev Environment Setup
* configure git name and email
  * git config --global user.email "rocketnewton@gmail.com"
  * git config --global user.name "Jon Newton"
* add public key to github 
* clone the code - git clone git@github.com:rocketnewton/tla.git
* sudo apt install nodejs
* sudo apt install npm 
* sudo npm install -g express-generator
* install mongodb community edition
  * wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
  * echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
  * sudo apt-get update
  * sudo apt-get install -y mongodb-org
