# MADU WEB 3 PROJECT

This repository contains the final for Madu.

## Usage

### 1. Clone repository & install dependencies

```sh
git clone https://github.com/ShonhTan/projet-w3.git	
cd projet-w3
yarn install # or `npm install`
```

### 2. Install the Prisma CLI

```sh
yarn global add prisma
```

You need to setup a Prisma service.

### 3. Deploy Prisma and database

```sh
prisma deploy
```

When prompted where you want to deploy your service (and after you have Docker installed), choose the **new database**.

### 4. Start the server & open Playground

To interact with the API in a GraphQL Playground, all you need to do is execute the `start` script defined in `package.json`:

```sh
yarn start
```
