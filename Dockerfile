FROM node:12

LABEL author="Nelson Castro" mail="00043516@uca.edu.sv"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
#RUN npm install pm2 -g

COPY . .

CMD [ "npm", "start" ]
#CMD ["pm2-runtime", "app.js"]
