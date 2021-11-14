FROM node:16-alpine as compiler
WORKDIR /usr/app
COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
RUN yarn install
COPY . ./
RUN yarn build

FROM node:16-alpine as builder
WORKDIR /usr/app
COPY --from=compiler /usr/app/package.json .
COPY --from=compiler /usr/app/yarn.lock .
RUN yarn install --prod=true
COPY --from=compiler /usr/app/build .

FROM node:16-alpine as runner
ENV NODE_ENV=production
WORKDIR /usr/app
COPY --from=builder /usr/app .
ENTRYPOINT ["node", "app.js"]