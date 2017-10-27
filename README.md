# Zapi
Create an API/Server without having to create the actual server yourself, all you have to worry about is the routes.
## Install
```sh
npm i --save z-api
```
## Usage
```js
const Zapi = require('z-api'),
  api = new Zapi()
```

### Add route
```js
const route = {
  method: 'GET', //Default is GET if not specified, Must be in caps
  path: '/', //Default is '/' if not specified,
  handler: (req, res) => {
    /*
    req and res are the standard http objects
    A good guide on how to use them here
    https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
    */
    res.end('The api works)
  }
}

api.addRoute(route)
```

### Remove route
```js
api.removeRoute('GET', '/') //Method and path
```

### Options
Options can be passed set when initialising the class, or they can be set later on.
### On initialisation
```js
api = new Zapi({
  port: 80
})
```
### After initialisation
```js
api.config.port = 80
```

### Used options
The following are config options that are currently used, more may be added in the future.

#### port
The port to run the server on, the default is 3002.
```js
port: 3002
```

#### defaultRoute
The default route options to use if that option is not specified.
The default method is GET.
The default path is '/'.
The default handler sends a response saying 'Default route'.
```js
defaultRoute: {
  method: 'GET',
  path: '/',
  handler: (req, res) => {
    res.send('Default route')
  }
}
```
### Middleware
Middleware is run in parallel for the best performance.
To add middleware use the addMiddleware function.
```js
api.addMiddleware((req, res, next) => {
  console.dir(req)
  next()
})
```