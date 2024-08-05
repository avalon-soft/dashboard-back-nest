# syntax = docker/dockerfile:experimental
FROM node:18-alpine AS base

FROM base AS builder
# create work directory in app folder
WORKDIR /app

# # install required packages for node image
RUN apk --no-cache add g++ make git

## SETUP npn registry 
COPY ./package.json /app/
RUN --mount=type=secret,id=auto-devops-build-secrets . /run/secrets/auto-devops-build-secrets && echo -e "//registry.npmjs.org/:_authToken=$NPM_REG_TOKEN" > /root/.npmrc
RUN npm set registry "https://registry.npmjs.org/"
RUN npm get registry 
## INSTALL node modules
RUN npm install --prefer-offline || npm install --prefer-offline --legacy-peer-deps

## copy over all files to the work directory
ADD . /app

## BUILD stage
RUN --mount=type=secret,id=auto-devops-build-secrets . /run/secrets/auto-devops-build-secrets && echo -e "$BUILD_ENV" > .env
RUN source .env 
#RUN cat .env
# Translate
RUN if grep -q 'VUE_APP_CROWDIN_PROJECT_ID' .env; then echo 'CROWDIN ENV EXIST'; node node_modules/@ananasbear/crowdin/app/app.js; else echo 'CROWDIN ENV DOEST NOT EXIST';fi
# build
# CI=false npm run build
RUN npm run build
# RUN [[ -d dist ]] && mv dist web; [[ -d build ]] && mv build web;

## Delete npn registry credentials
RUN rm -f /root/.npmrc
ENV TZ="Europe/Kiev"
# ENV HOST 0.0.0.0
EXPOSE 3100
CMD ["npm", "run", "start:prod"]


  
