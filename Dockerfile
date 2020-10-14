FROM node:12

LABEL author="Nelson Castro"
LABEL mail="00043516@uca.edu.sv"

#RUN apt update -y
#RUN apt install -y git

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install pm2 -g

COPY . .

EXPOSE 8080
CMD ["pm2-runtime", "app.js"]