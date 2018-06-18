cd ~/Downloads/
echo pwd
passwd
service ssh start
apt install -y x11vnc
 VERSION=v8.11.3
 DISTRO=linux-x64
 wget "https://nodejs.org/dist/v8.11.3/node-$VERSION-$DISTRO.tar.xz"
 sudo mkdir /usr/local/lib/nodejs
 sudo tar -xJvf node-$VERSION-$DISTRO.tar.xz -C /usr/local/lib/nodejs 
 sudo mv /usr/local/lib/nodejs/node-$VERSION-$DISTRO /usr/local/lib/nodejs/node-$VERSION
