FROM node:8.10.0

WORKDIR /home/k8s-monitor/

RUN node -v && npm -v

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY src src
COPY tsconfig.json tsconfig.json

RUN ./node_modules/typescript/bin/tsc

ENTRYPOINT ["/bin/bash", "-c"]
