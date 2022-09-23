console.log('hello');

const fs = require('fs');
const { writeFile } = require('fs');
const http = require('http');
const _ = require('lodash');
const  = require('lodash');

let num = _.once(()=>{
    console.log("greet");
})
num();
num();

let nub = _.random(0, 20);
console.log(nub);
const server = http.createServer((req, resp) => {
    console.log("request has been made");
    // console.log(req.method);
    // console.log(req.url);
    resp.setHeader('content-type', 'text/html');
    // resp.write('<h2>hello, amature-coder</h2>');
    switch(req.url) {
        case '/':
            console.log("this is index page")
            resp.statusCode = 200;
            break;
        case '/about':
            console.log('about.html');
            resp.statusCode = 200;
            console.log(resp.statusCode);
            break;

            default:
                console.log("404 error found")
                resp.statusCode = 200;
                break;
            }
    fs.readFile('html/index.html', (err, data)=> {
        if(err) {
            console.log(err);
            resp.end(err);
        }
        else{
            resp.statusCode = 200;
            resp.end(data);
        }
    })
});
server.listen(4500, 'localhost', () => {
    console.log("server is listening on port 4500")
});
