const express = require('express');
const app = express();

app.listen(4500);

app.get('/', function(req, res) {
    // res.send('<h1 style="background-color:red; text-align: center; font-size: 60px;"><marquee>contact Page</marquee></h1><br><h2>Welcome to the Contact Page</h2>');
        res.sendFile('html/index.html', {root:__dirname});
});

app.get('/about', (req, res) => {
    res.sendFile('html/about.html', {root:__dirname});
});

app.get('/about-us', (req, res) => {
    res.redirect('/about');
});

app.get('/contact', function(req, res) {
    res.send('<h1 style="background-color:red; text-align: center; font-size: 60px;"><marquee>Contact Page</marquee></h1><br><h2>Welcome to the Contact Page</h2>');
    // res.redirect('html/contact.html', {root:__dirname});
});


app.use((req, res) => {
    res.status(404).sendFile('./html/Error.html', {root:__dirname});
});



