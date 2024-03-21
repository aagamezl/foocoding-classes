#!/usr/bin / env node
// import http from 'node:http'

import app from './app.js'

// /**
//  * Normalize a port into a number, string, or undefined.
//  *
//  * @param {string} value
//  * @return {number}
//  */
// const normalizePort = (value) => {
//   const port = parseInt(value, 10)

//   if (isNaN(port)) {
//     // named pipe
//     return value
//   }

//   if (port >= 0) {
//     // port number
//     return port
//   }

//   return undefined
// }

// /**
//  * Event listener for HTTP server 'error' event.
//  *
//  * @param {NodeJS.ErrnoException} error
//  */
// const onError = (error) => {
//   if (error.syscall !== 'listen') {
//     throw error
//   }

//   const bind = typeof port === 'string'
//     ? `Pipe ${port}`
//     : `Port ${port}`

//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case 'EACCES':
//       console.error(new Error(`${bind} requires elevated privileges`))

//       process.exit(1)

//       break
//     case 'EADDRINUSE':
//       console.error(new Error(`${bind} is already in use`))

//       process.exit(1)

//       break
//     default:
//       throw error
//   }
// }

// /**
//  * Event listener for HTTP server 'listening' event.
//  */
// const onListening = (error, address) => {
//   // if (error) {
//   //   // server.log.error(error)
//   //   onError(error)
//   // }

//   // console.info(`Listening on ${addr.address} ${bind}`)
//   // console.log(`Listening on ${address}`)
//   const addr = server.address()
//   const bind = typeof addr === 'string'
//     ? `pipe ${addr}`
//     : `port ${addr.port}`

//   console.info(`Listening on ${addr.address} ${bind}`)
// }

// // Graceful shutdown
// // process.on('SIGTERM', () => {
// //   console.info('SIGTERM signal received: closing HTTP server')
// // })

// process.on('unhandledRejection', (reason) => {
//   throw reason
// })

// process.on('uncaughtException', error => {
//   console.error(error)

//   setImmediate(() => {
//     process.exit(1)
//   })
// })

// // Get port from environment and store in Express.
// const port = normalizePort(process.env.PORT)
const port = process.env.PORT ??3000
const hostname = process.env.HOSTNAME

// // Create HTTP server.
// const server = http.createServer(app)

// server.listen(port, hostname)
// server.on('error', onError)
// server.on('listening', onListening)

app.listen(port, hostname, () => {
  console.info(`Listening on ${hostname}:${port}`)
})
