const http = require('http')

const server = http.createServer((req, res) => {
    if (req.url == '/') {
        res.setHeader('Content-type', 'text/html')
        res.setHeader('Jared', 'Jared is awesome')
        res.write('<html>')
        res.write('<head><title>Testing My Server</title></head>')
        res.write('<body><h1>Welcome to My Server Page</h1><br><img src="https://media.giphy.com/media/dzaUX7CAG0Ihi/giphy.gif"></body>')
        res.write('</html>')
        return res.end()
    }
    if (req.url === '/api') {
        const bear = {
            animal: 'Grizzly Bear',
            color: 'Brown',
            weight: 1200,
        }
        res.setHeader('Content-Type', 'application/json')
        res.write(JSON.stringify(bear))
        return res.end()
    }
    if (req.url === 'user') {
        const body =[];
        req.on('data', chunk => {
            body.push(chunk)
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            console.log(parsedBody.split('=')[1])
        })
        req.statusCode = 302
        req.setHeader('location', '/')
        req.end()
    }
})

server.listen(5000)
