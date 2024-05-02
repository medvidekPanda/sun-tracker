FROM node:20 as deps
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm install
COPY --chown=node:node . .
RUN npm run build
USER node

# Production image, copy all the files and run nest
FROM node:20-alpine as runner
ENV NODE_ENV production
ENV PORT 3333
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=deps /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=deps /usr/src/app/dist ./dist
USER node
EXPOSE 3333
CMD ["node", "dist/main.js"]
