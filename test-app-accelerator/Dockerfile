# stage 1 building the code
FROM node as builder
WORKDIR /test-app-accelerator
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

# stage 2
FROM node
WORKDIR /test-app-accelerator
COPY package*.json ./
RUN npm install --production

COPY --from=builder /test-app-accelerator/dist ./dist
COPY src/prisma/ ./src/prisma/
COPY .env .

RUN npm run prisma:generate
EXPOSE 4000
CMD npm start
