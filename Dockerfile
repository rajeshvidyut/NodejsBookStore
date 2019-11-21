FROM node:10-alpine

RUN mkdir -p /home/rajesh/Documents/krds/nodebase/node_modules && chown -R node:node /home/rajesh/Documents/krds/nodebase/

WORKDIR /home/rajesh/Documents/krds/nodebase/

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "app.js" ]