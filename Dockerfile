# This container is suppsoed to run npm run build
FROM node:lts-alpine3.12

WORKDIR /root
RUN apk update && \
    apk add --no-cache bash

EXPOSE 8080
CMD /bin/bash
