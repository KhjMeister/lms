const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = true
const hostname = 'localhost'
const port = 8000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true)
      const { pathname, query } = parsedUrl

      if (pathname === '/a') {
        await app.render(req, res, '/a', query)
      } else if (pathname === '/b') {
        await app.render(req, res, '/b', query)
      } else {
        await handle(req, res, parsedUrl)
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})



// const express = require("expresss");
// const next = require("next");
// const {createProxyMiddleware} = require('http-proxy-middleware');

// const dev = true

// const app = next({ dev });

// const handle = app.getRequestandler();
// app.prepare().then(() => {
//     const server = express()
//     if(dev){
//         server.use(
//             '/api',
//             createProxyMiddleware({
//                 target:"http://localhost:8000",
//                 changeOrigin:true
//             })
//         );
//     }
//     server.all('*', (req,res) => {
//         return handle(req,res);
//     });
//     server.listen(3000,(err)=>{
//         if(err) throw err;
//         console.log('> Ready on http:localhost:8000')
//     })
// }).catch((err)=>{
//     console.log("Error",err);
// })



