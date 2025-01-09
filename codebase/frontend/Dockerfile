FROM node:21.6-slim
WORKDIR /frontend
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn run build
CMD ["yarn","start"]