# Overview

A simple [dApp](https://en.wikipedia.org/wiki/Decentralized_application) that connects to a MetaMask wallet and makes transactions.

## Features

- Connect a metamask wallet on goerli
- View the connected wallet’s balance and address
- Send goerli ETH to another wallet
- View transactions made via the app and their status

## Running the project locally

### Prerequisite, the database

This project uses an ORM called Prisma along with Postgres, you can follow [the official guide](https://www.prisma.io/dataguide/postgresql/setting-up-a-local-postgresql-database) on how to setup a postgres server locally.

### Start the server

You need to have NodeJS installed locally along with yarn.

To run the project simply run these 2 commands:

```sh
# Install the dependencies
yarn install
# Run the project
yarn dev
```

## Testing

This project currently has unit tests:

```sh
yarn test
```

## Deploying the app on a server

You can follow the [official nextjs example](https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile) to deploy the app as a docker container.
