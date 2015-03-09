FROM ubuntu:14.10

# make sure apt is up to date
RUN apt-get update

# Install newest Node 0.10.x repo
# (Just running apt-get install -y nodejs would install 0.10.25 which is too old)
RUN apt-get install -y curl && curl -sL https://deb.nodesource.com/setup | sudo bash -

# install nodejs, npm and git
RUN apt-get install -y nodejs git git-core

# install react-isomorphic-starterkit
RUN git clone https://github.com/RickWong/react-isomorphic-starterkit.git
RUN cd react-isomorphic-starterkit && npm install -g supervisor webpack webpack-dev-server concurrently
RUN cd react-isomorphic-starterkit && npm install

