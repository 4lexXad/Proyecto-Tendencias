FROM node:18

RUN mkdir -p .

COPY . .

WORKDIR .

EXPOSE 3000

CMD node index.js