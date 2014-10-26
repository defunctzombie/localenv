# localenv [![Build Status](https://travis-ci.org/defunctzombie/localenv.svg)](https://travis-ci.org/defunctzombie/localenv)

Load environment variables from `.env` into `process.env` in *development*.

> "Storing [configuration in the environment](http://www.12factor.net/config) is one of the tenets of a [twelve-factor app](http://www.12factor.net/). Anything that is likely to change between deployment environments–such as resource handles for databases or credentials for external services–should be extracted from the code into environment variables.
> 
> But it is not always practical to set environment variables on development machines or continuous integration servers where multiple projects are run. Dotenv load variables from a `.env` file into ENV when the environment is bootstrapped."
> 
> [Brandon Keepers' Dotenv in Ruby](https://github.com/bkeepers/dotenv)

## Use

Put this require statement as early in your app code as possible. Ideally before any other require statements are run.

```js
require('localenv');

// everything else after
```

## .env files

Localenv will **ONLY** load `.env` files in *development*. Development is defined by the `NODE_ENV` environment variable. Any value other than `production` is considered development.

Example `.env` files

```env
DEBUG=app*

# this is a comment
DB_URL=postgres://localhost:5432/my_database

# api requests
API_URL=http://api.myapp.com
```

## .env.local

Additionally, you can create an `.env.local` file alongside `.env` which contains any overrides or additional environment variables.

If the project's `.env` file has a value of `DEBUG=app*` but you want to point to a different API server.

```env
API_URL=http://localtest:5000
```

***Note***: Add `.env.local` to your `.gitignore` file to ensure that no developer commits their local overrides to the repo.

## Load order

Precensece is followed in this order. If a particular variable is already set by the time a file is loaded, the env var in the file will be ignored. In this way, `process.env` has the highest precedence and `.env` the lowest.

* `process.env`
* `.env.local`
* `.env`

## Should I commit my .env file?

**YES**

>This makes it easy for other developers to get started on the project without compromising credentials for other environments. If you follow this advice, make sure that all the credentials for your development environment are different from your other deployments and that the development credentials do not have access to any confidential data

>Credentials should only be accessible on the machines that need access to them. Never commit sensitive information to a repository that is not needed by every development machine and server. [1]

The `.env` file is a great localtion to document all of the environment settings used by your app. As they change, this file will continue to reflect the defaults.

***Note***: Do not commit your `.env.local` file which is personal to your machine and may be used to temporarily override the defaults provided by the project `.env` file.

## Avoid automatic loading and injection

By default, `require('localenv')` will load and inject the environment values found in the `.env` file. If you wish to avoid automatic loading and perform the injection yourself (from custom files), you can `require('localenv/noload')`

```js
var localenv = require('localenv/noload');

// load and inject the variables into process.env
localenv.inject_env('/path/to/.env/file');
localenv.inject_env('/path/to/.env.test');
```

## License

MIT

## Credits

* Based on work from the [dotenv](https://www.npmjs.org/package/dotenv) module which is also MIT licensed.
* Some ideas from [dotenv](https://github.com/bkeepers/dotenv) ruby as well.

[1]: https://github.com/bkeepers/dotenv#should-i-commit-my-env-file

