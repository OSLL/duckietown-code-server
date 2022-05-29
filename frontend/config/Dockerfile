FROM lscr.io/linuxserver/code-server

COPY . ./config

WORKDIR config

RUN mkdir current-repository
RUN apt-get update -yq \
    && apt-get install curl gnupg -yq \
    && curl -sL https://deb.nodesource.com/setup_12.x | bash \
    && apt-get install nodejs -yq

RUN cd ./extensions/helloworld/ \
    && npm i \
    && npm run compile-web