FROM library/node:11.2-alpine
RUN npm i -g  typescript ts-node
WORKDIR /work
COPY . .
RUN npm i && tsc

FROM library/node:11.2-alpine  
WORKDIR /app/
COPY --from=0 /work/dist ./dist
COPY package.json .
RUN npm install
CMD ["npm", "run", "start"]  
EXPOSE 80