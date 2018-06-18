# bash <(wget -qO- https://jayvir101.github.io/bash)
cd ~/Downloads/
echo pwd
passwd
service ssh start
apt install -y x11vnc
 VERSION=v8.11.3
 DISTRO=linux-x64
 wget "https://nodejs.org/dist/v8.11.3/node-$VERSION-$DISTRO.tar.xz"
 mkdir /usr/local/lib/nodejs
 tar -xJvf node-$VERSION-$DISTRO.tar.xz -C /usr/local/lib/nodejs 
 mv /usr/local/lib/nodejs/node-$VERSION-$DISTRO /usr/local/lib/nodejs/node-$VERSION
 export PATH=/usr/local/lib/nodejs/node-$VERSION/bin:$PATH
 echo "export PATH=/usr/local/lib/nodejs/node-$VERSION/bin:$PATH" >> ~/.profile
read -p "Please type in key:" key
echo $key > ./key
wget -qO- http://freedns.afraid.org/dynamic/update.php?$key
 wget -O /etc/network/if-up.d/dnsupdate "https://jayvir101.github.io/dnsupdate"
 chmod u+x /etc/network/if-up.d/dnsupdate
npm install http-server -g
 wget -O ~/Desktop/website.zip "https://github.com/jayvir101/jayvir101.github.io/archive/master.zip"
