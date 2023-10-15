FROM node:lts-alpine as build
WORKDIR /home/node/app
COPY --chown=node:node ./code/package.json ./code/yarn.lock* ./
RUN export NODE_ENV=development; yarn install
COPY --chown=node:node ./code .
RUN export NODE_ENV=production; yarn prisma generate && yarn nest build

FROM node:lts-alpine
WORKDIR /home/node/app
COPY --chown=node:node --from=build /home/node/app/package.json /home/node/app/yarn.lock ./
COPY --chown=node:node --from=build /home/node/app/src/prisma ./src/prisma
COPY --chown=node:node --from=build /home/node/app/dist ./dist
RUN export NODE_ENV=production; yarn install --frozen-lockfile --no-optional --production && yarn cache clean --force && yarn prisma generate && chown node:node -R .
USER node
ENTRYPOINT [ "node" ]
CMD [ "dist/main" ]
