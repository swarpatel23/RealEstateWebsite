FROM node:10
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app/
EXPOSE 4200
CMD [ "npm","start" ]
