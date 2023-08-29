####################
# DEV IMAGE -  Run `docker build --target development` when building locally.
####################

FROM node:18-alpine As development

WORKDIR /app

ENV NODE_ENV production
COPY --chown=node:node package*.json yarn.lock* ./
RUN yarn install --frozen-lockfile --production && \
    yarn global add @nestjs/cli 

COPY --chown=node:node . .

RUN yarn build

####################
# PRODUCTION IMAGE #
####################

FROM europe-west1-docker.pkg.dev/infra-freebank-test-rd/base-images/node-18:v0.0.2 As production

WORKDIR /app
ENV NODE_ENV production
# Copy the bundled code from the build stage to the production image
COPY --chown=node-app:node --from=development /app/node_modules ./node_modules
COPY --chown=node-app:node --from=development /app/dist ./dist
COPY --chown=node-app:node --from=development /app/package*.json yarn.lock* ./

# Start the server using the production build
CMD ["yarn", "start:prod"]