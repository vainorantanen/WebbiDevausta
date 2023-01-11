FROM denoland/deno:alpine-1.26.2

EXPOSE 7777

WORKDIR /app

COPY . .

RUN deno cache deps.js

CMD [ "run", "--unstable", "--watch", "--allow-net", "--allow-read", "--allow-env", "--no-check", "app.js" ]