FROM node:12.18.3

RUN mkdir /myapp
WORKDIR /myapp
ADD package.json /myapp/package.json
ADD yarn.lock /myapp/yarn.lock
RUN yarn install --frozen-lockfile

COPY . /myapp

EXPOSE 3000

CMD bin/docker-start
