const express = require("express");

const app = express();

app.use(express.json());

app.listen(4500);

let users = {};

const authRouter = express.Router();

app.use('/auth', authRouter);

authRouter
.route('/signup')
.get(getSignup)
.post(postSignup);

function getSignup(req, res) {
    res.sendFile('html\public.html', {root: __dirname});
}

function postSignup(req, res) {
    let obj = req.body;
    console.log("my obj",obj);
    res.json({
        message: "user signed up",
        data: obj
    });
}