import http from 'node:http'

const PORT = 3000
const HOSTNAME = '::'

const DATABASE = [{
  id: 1,
  email: 'john.doe@email.com',
  password: '12345678'
}, {
  id: 2,
  email: 'jane.doe@email.com',
  password: '87654321'
}]

const server = http.createServer((req, res) => {
  const { method, url } = req
  const segments = url.split('/')

  const body = []
  req
    .on('data', chunk => {
      body.push(chunk)
    })
    .on('end', () => {
      if (method === 'GET' && url === '/') {
        res.end(JSON.stringify({
          data: 'Hello World!'
        }))
      }

      if (method === 'POST' && url === '/login') {
        const payload = JSON.parse(Buffer.concat(body).toString())
        console.log(payload) // {email: '...', password: '...'}

        const userExists = DATABASE.find(user => {
          return user.email === payload.email && user.password === payload.password
        })

        if (!userExists) {
          res.statusCode = 401

          res.end(JSON.stringify({
            message: 'Email or password are incorrect'
          }))

          return
        }

        return res.end(JSON.stringify({
          message: 'User login successfully'
        }))
      }

      if (method === 'POST' && url === '/signup') {
        const payload = JSON.parse(Buffer.concat(body).toString())
        console.log(payload) // {email: '...', password: '...'}

        DATABASE.push(payload)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify({
          message: 'Registration Completed'
        }))
      }

      if (segments.length === 2 && method === 'GET' && url === '/users') {
        res.end(JSON.stringify(DATABASE))
      }

      if (segments.length === 3 && method === 'GET' && url.startsWith('/users')) {
        const id = parseInt(segments.pop())

        const user = DATABASE.find(user => user.id === id)

        if (!user) {
          return res.writeHead(404).end(JSON.stringify({
            message: 'User doesn\'t exists'
          }))
        }

        res.end(JSON.stringify(user))
      }
    })
    .on('error', err => {
      console.error(err)
    })
})

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server running on ${HOSTNAME}:${PORT}`)
})
