FROM node:19.5.0-alpine
WORKDIR /app

## Copy project into repo
COPY package.json .
RUN npm i

## Install all deps
COPY frontend/ frontend/
RUN cd frontend/ && npm i
COPY backend/ backend/
RUN cd backend/ && npm i

## Build front end
RUN cd frontend && npm run build

CMD ["npm", "start"]
