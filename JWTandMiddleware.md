## JWT - JSON Web Tokens [https://jwt.io/](https://jwt.io/)

JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.

- Authorization: This is the most common scenario for using JWT. Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token.
- Information Exchange: JSON Web Tokens are a good way of securely transmitting information between parties.

### To use JWT in the project install jsonwebtoken package

```js
npm install jsonwebtoken
```

## [Middleware](https://expressjs.com/en/guide/using-middleware.html)

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle

Middleware functions can perform the following tasks:

- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware function in the stack.

### packages used

```js
npm i bcryptjs
npm i jsonwebtoken
npm i express-validator
```
