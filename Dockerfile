FROM node:argon
WORKDIR /src
ADD . .
RUN npm install
EXPOSE 8080
CMD ["npm", "run",  "server"]
