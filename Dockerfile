FROM node

WORKDIR /rentx/app

COPY package.json ./

RUN npm i --silent

COPY . .

EXPOSE 3333

CMD npm run dev