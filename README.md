# Turborepo Docker starter

This is an official Docker starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest -e with-docker
```
### Apps and Packages

- `@repo/web`: a [Next.js](https://nextjs.org/) app
- `@repo/api`: an [Express](https://expressjs.com/) server
- `@repo/eslint-config-custom`: `eslint` configurations for client side applications (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/eslint-config-custom-server`: `eslint` configurations for server side applications (includes `eslint-config-next` and `eslint-config-prettier`)
- `scripts`: Jest configurations
- `@repo/typescript-config`: tsconfig.json's used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

