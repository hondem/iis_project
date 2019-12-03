FROM node:10

# USER root

RUN apt update
RUN apt upgrade -y
RUN apt install -y python2.7 python-pip

RUN mkdir -p /app/node_modules && chown -R node:node /app

WORKDIR /app

COPY --chown=node:node package*.json ./
COPY --chown=node:node tsconfig.json ./

USER node

RUN pip install psycopg2-binary
RUN npm install

COPY --chown=node:node ./src ./src

RUN npm run build

EXPOSE 5000

CMD [ "node", "dist/app.js" ]