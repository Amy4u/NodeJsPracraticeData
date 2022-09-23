const app = require('./app');

console.log(app.one);

console.log('hello');
const http = require('http');

const server = http.createServer((req, res) => {

    if(req.url === '/about') {
        console.log('<h1>This is about page</h1>');
        res.end('<h1>This is about page</h1>');
    } else if(req.url === "/contact") {
        console.log('<h1>This is about page</h1>');
        res.end('<h1>This is contact page</h1>');
    } else {
        res.write('<h1>This is node http module</h1>');
        console.log('<h1>This is about page</h1>');
        res.write('<h1>This is node http module</h1>');
        res.end('<p>Hello Node.js</p>');
    }
});

server.listen(4500);    

// const file = require('fs');

// file.writeFile("sample.txt", "sample file");

const one = [
    'tushar',
    'harsh'
];

module.exports = { one };