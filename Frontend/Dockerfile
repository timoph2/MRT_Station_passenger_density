# FROM node:20-alpine
# WORKDIR /react-docker-example/
# COPY public/ /react-docker-example/public
# COPY src/ /react-docker-example/src
# COPY package.json /react-docker-example/

# RUN npm install
# CMD ["npm", "start"]

#docker image build -t lta-frontend .

# stage 1 - build the React app
FROM node:20-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
COPY ./package-lock.json /app/
RUN npm install
COPY . /app
RUN npm run build

# stage 2 - build the final image and copy the react build files
FROM nginx:1.17.8-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]