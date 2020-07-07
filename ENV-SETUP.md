# Dev Environment Setup
* configure git name and email
```
  git config --global user.email "rocketnewton@gmail.com"
  git config --global user.name "Jon Newton"
```
* add public key to github 
* clone our code - git clone git@github.com:rocketnewton/meanwifi.git
* clone example code - git clone https://github.com/cliveharber/gettingMean-2.git
* sudo apt install nodejs
* sudo apt install npm 
* sudo npm install -g express-generator
* sudo npm install -g nodemon
* install mongodb community edition
```
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
sudo apt update
sudo apt install -y mongodb-org
```
