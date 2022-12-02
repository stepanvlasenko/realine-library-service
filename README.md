# Realine library service

## What's inside?

This turborepo uses [pnpm](https://pnpm.io) as a package manager. It includes the following packages/apps:

### Apps and Packages

- `web`: a [Nuxt.js](https://nuxtjs.org) app
- `backend`: a [Nest.js](https://nestjs.com/) app
- `config`: `eslint` configuration (using [@antfu/eslint-config](https://github.com/antfu/eslint-config))
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

### Setup

To install all dependencies, run the following command:

```
pnpm install
```

### Develop

To develop all apps and packages, run the following command:

```
pnpm run dev
```

### Lint

To check & fix linter through all apps and packages, run the following command:

```
pnpm run lint
pnpm run lint:fix
```

### Test

To run tests through all apps and packages, run the following command:

```
pnpm run test
```

### Build

To build all apps and packages, run the following command:

```
pnpm run build
```
