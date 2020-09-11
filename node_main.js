const http =  require('http')

const server = http.createServer((req, res)=> {
  console.log(req.url)
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('hello nodejs')
})

server.listen(8080)
