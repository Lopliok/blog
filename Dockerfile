FROM node:10

WORKDIR /microservices

COPY package*.json ./
COPY tsconfig.json tsconfig.json
COPY tsconfig.build.json tsconfig.build.json
COPY src src
RUN ["npm","install","global","@nestjs/cli"]
RUN ["npm", "install"]

EXPOSE 3000/tcp

ENTRYPOINT ["npm","run","start"]