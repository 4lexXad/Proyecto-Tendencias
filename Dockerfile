FROM node:18

RUN mkdir -p /home/Proyecto-tendencias

COPY . /home/Proyecto-tendencias

WORKDIR /home/Proyecto-tendencias

EXPOSE 3000

CMD node test.js