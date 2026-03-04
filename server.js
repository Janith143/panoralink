const { createServer } = require('http');

const hostname = '0.0.0.0'; // Bind to all interfaces (standard for hosting)
const port = process.env.PORT || 3000;

const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello from Hostinger Node.js Test!\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
