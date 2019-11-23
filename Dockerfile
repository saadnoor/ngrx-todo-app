FROM node:10.0.0

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@latest

COPY . /app

CMD ng serve --host 0.0.0.0

# Need to add unit test and e2e test support for this dockerfile.
