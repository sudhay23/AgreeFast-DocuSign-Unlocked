FROM node:21
WORKDIR /agreefast_backend_api_service
COPY ./package*.json .
RUN npm ci
COPY . .
EXPOSE 5500
CMD [ "npm","run","dev" ]