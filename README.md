# decipher-sails

Alternative CLI for sails.js that initiates a new Sails project with various modifications:

- Sails is generated with the `--no-frontend` option
- Responders for success and error responses
- Extra error types
- A service that checks the environment, based on a schema in config
- Two versions of `.sailsrc`, with modifcations (grunt is turned off, version with and without sessions)
- A policy that authenticates the user with a SSO service
- Logic that prefixes every route for use with Amazon's Application Load Balancer (e.g. app running on `https://domain.com/app-name`)
- Custom http config that replaces the default `X-Powered-By` header
- A custom `res.redirect` function that takes into account the ALB prefix
- Various custom changes are provided by the [decipher-sails-utils](https://npmjs.com/package/decipher-sails-utils) package


## Installation

``` 
$ npm install -g decipher-sails-tool
```


## Usage

Generate a new project in a directory relative to the current path. 

```
$ decipher-sails ./my-project-name
```

