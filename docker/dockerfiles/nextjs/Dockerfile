FROM node:18

WORKDIR /app/
COPY ./frontend .
RUN npm install -g pnpm

COPY ./docker/dockerfiles/nextjs/start.sh /start.sh
RUN chmod +x /start.sh
CMD /start.sh