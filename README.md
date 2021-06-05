# RESTful API Express MongoDB Template

[![Author](http://img.shields.io/badge/author-@sbrg95-blue.svg)](https://www.linkedin.com/in/sbrg95/) [![GitHub license](https://img.shields.io/github/license/sbrg95/express-mongodb-api-template)](https://github.com/sbrg95/express-mongodb-api-template/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Template/Starter Project for building RESTful APIs using Node.js, Express and MongoDB

## Installation

Clone the repo:

```bash
git clone --depth 1 https://github.com/sbrg95/express-mongodb-api-template.git
cd express-mongodb-api-template
npx rimraf ./.git
```

Install the dependencies:

```bash
npm install
```

## Table of Contents

- [Features](#features)
- [Commands](#commands)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Validation](#validation)
- [Logging](#logging)
- [Linting](#linting)

## Features

- **NoSQL database**: [MongoDB](https://www.mongodb.com) object data modeling using [Mongoose](https://mongoosejs.com)
- **Authentication and authorization**: using [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Logging**: using [winston](https://github.com/winstonjs/winston) and [morgan](https://github.com/expressjs/morgan)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Compression**: gzip compression with [compression](https://github.com/expressjs/compression)
- **Linting**: with [ESLint](https://eslint.org) and [Prettier](https://prettier.io)
- **Testing**: TODO

## Commands

Running locally:

```bash
npm run dev
```

Running in production:

```bash
npm start
```

Testing: TODO

Linting:

```bash
# run ESLint
npm run lint

# fix ESLint errors
npm run lint:fix

# run prettier
npm run prettier

# fix prettier errors
npm run prettier:fix
```

## Project Structure

```
src\
 |--config\                     # Configuration
 |--resources\
 |----resource\
 |------resource.controller.js  # Controllers
 |------resource.model.js       # Model
 |------resource.router.js      # Routes
 |--utils\                      # Utility functions and middlewares
 |--server.js                   # Express server
 |--index.js                    # App entry point
```

### API Endpoints

List of available routes:

**Auth routes**:\
`POST /auth/signup` - register\
`POST /auth/signin` - login

**User routes**:\
`GET /api/user` - get user\
`PUT /api/user` - update user

**Todo routes**:\
`GET /api/todo` - get all todos\
`POST /api/todo` - create a todo\
`GET /api/todo/:id` - get todo\
`PUT /api/todo/:id` - update todo\
`DELETE /api/todo/:id` - delete todo\

**Pagination**:\
`GET /api/todo?limit=5&page=2` - get all todos (limit 5 results ans select page 2)

## Validation

Request data is validated using [Joi](https://joi.dev/). Check the [documentation](https://joi.dev/api/) for more details on how to write Joi validation schemas.

The validation schemas are defined in the `src/utils/validation` file.

## Logging

Import the logger from `src/utils/logger.js`. It is using the [Winston](https://github.com/winstonjs/winston) logging library.

## Linting

Linting is done using [ESLint](https://eslint.org/) and [Prettier](https://prettier.io).

In this app, ESLint is configured to follow the [Airbnb JavaScript style guide](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base). It also extends [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to turn off all rules that are unnecessary or might conflict with Prettier.

To modify the ESLint configuration, update the `.eslintrc.json` file. To modify the Prettier configuration, update the `.prettierrc.json` file.

To prevent a certain file or directory from being linted, add it to `.eslintignore` and `.prettierignore`.

## License

[MIT](LICENSE)
