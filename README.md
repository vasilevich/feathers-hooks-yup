## feathers-hooks-yup
Feathers hook utility for schema validation and sanitization using [Yup](https://github.com/jquense/yup).
Error messages are converted to web/mobile friendly formats,
and optionally translated for clarity or internationalization.

Supports both JS and Typescript.

The reason I decided to do this, 
because I found that using [Yup](https://github.com/jquense/yup) clientside with react is the recommended approach.
but I did not want to rewrite the rules in JOI or any other validation framework that are already available.
this hook allows me to simply share the validations from the clientside.

[![Build Status](https://travis-ci.org/vasilevich/feathers-hooks-yup.svg?branch=master)](https://travis-ci.org/vasilevich/feathers-hooks-yup)
[![Coverage Status](https://coveralls.io/repos/github/vasilevich/feathers-hooks-yup/badge.svg?branch=master)](https://coveralls.io/github/vasilevich/feathers-hooks-yup?branch=master)

## Code Example

```javascript
import * as Yup from "yup";
import {Hook, HookContext} from '@feathersjs/feathers';
import {BadRequest} from '@feathersjs/errors';

const yupSchema = Yup.object({
  email: Yup.string()
    .email("invalid email")
    .required("email required"),
  retypeEmail: Yup.string()
    .oneOf([Yup.ref('email'), undefined], 'email not equal')
    .required("must enter email again"),
  password: Yup.string()
    .required('must enter password')
    .min(8, 'password must be 8 letters')
    .matches(/[a-zA-Z0-9]/, 'error ...'),
  acceptedTerms: Yup.boolean()
    .required("Required")
    .oneOf([true], "must accept terms"),
});
export default yupSchema;
```

```javascript
import yupValidationHook from 'feathers-hook-yup';
import yupSchema from './yupSchema.js';
const yupOptions = {abortEarly: false};
export.before = {
  create: [ yupValidationHook(yupSchema, yupOptions, translationMethod) ],
  update: [ yupValidationHook(yupSchema, yupOptions, translationMethod) ],
  patch: [ yupValidationHook(yupSchema, yupOptions, translationMethod) ]
};

```

(3) Internationalize or clarify Joi error messages.

Translation method example:
```javascript
//some translating logic...
function i18n(str) { return str; } // internationalization
const translationMethod = (formattedErrors) => {
        for(const errorKey in formattedErrors){
            formattedErrors[errorKey] = i18n(formattedErrors[errorKey]);
        }
        return formattedErrors;
    }

export.before = {
  create: [ yupValidationHook(yupSchema, yupOptions, translationMethod) ],
};
```
## Motivation


## Installation

Install [Nodejs](https://nodejs.org/en/).

Run `npm install feathers-hooks-yup --save` in your project folder.   
or   
Run `yarn add feathers-hooks-yup` in your project folder.   
You can then require the utilities.

## API Reference

To do.

## Tests
To do.
`npm test` to run tests.

`npm run cover` to run tests plus coverage.

## Contributors



## Credit

- [logicwind](https://github.com/logicwind/feathers-hooks-joi) for taking their readme as an example, and for the inspiration to set up this package.

## License

MIT. See LICENSE.
