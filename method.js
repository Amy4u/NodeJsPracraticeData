const express = require("express");
const app = express();
const cors = require('cors');
const connect = require('./config/connection');
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cors());
connect();
app.use(cookieParser());

// app.use((err, req, res, next) => {
//     console.log(err.message);
// })
app.listen(4500);

// let users = {};

// app.get('/user',(req,res) => {
//     res.send(users);
// });

// app.post('/user', (req, res) => {
//     console.log(req.body);
//     users = req.body
//     res.json({
//         message: "data received successfully",
//         user: req.body
//     });

// });

// app.patch("/user", (req, res) => {
//     console.log('req.body-->', req.body);
//     let dataToBeUpdated = req.body;
//     for(key in dataToBeUpdated) {
//         users[key] = dataToBeUpdated[key];
//     } 
//     res.json({
//         message: "data updated successfully"
//     })
// });

// app.delete("/user", (req, res) => {
//     users = {};
//     res.json({
//         message: "data deleted successfully"        
//     });
// });

// let users = [
//     {
//         'id': 1,
//         'name': "Amit"
//     },
//     {
//         'id': 2,
//         'name': "Anshul"
//     }, 
//     {
//         'id': 3,
//         'name': "Tushar"
//     }
// ];
// params


const userRoute = express.Router();
const authRouter = express.Router();

app.use("/user", userRoute);
app.use('/auth', authRouter);

userRoute
.route('/')
.get(getUsers)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRoute
.route('/getCookies')
.get(getCookies);

userRoute
.route('/setCookies')
.get(setCookies);

authRouter
.route('/signup')
.get(middleware,getSignup,middleware2)
.post(postSignup);


function middleware(req, res, next) {
    console.log("middleware enountered");
    next();
}

function middleware2(req, res) {
    console.log("middleware2 enountered");
    // res.json({
    //     message: "middleware2 run"
    // })
}

userRoute.route('/:id').get(getUserByid);

// const createUser = require('./models/User');
// createUser();
//import of userModel file from user file
const { userModel } = require('./models/User');
// default function for all methods

async function getUsers(req, res) {
    let allUsers = await userModel.find();

    res.json({
        message: "list of all users",
        data: allUsers
    })
};
function postUser (req, res) {
    console.log(req.body);
    users.push(req.body);
    res.json({
        message: "data received successfully",
        users: req.body
    });
};


async function updateUser (req, res) {
    console.log('req.body-->', req.body);
    let dataToBeUpdated = req.body;
    let user = await userModel.findOneAndUpdate({email: 'anshu@gmail.com'}, dataToBeUpdated);
    for(key in dataToBeUpdated) {
        users[key] = dataToBeUpdated[key];
    } 
    res.json({
        message: "data updated successfully",
        data: user
    })
};
async function deleteUser (req, res) {
    // users = {};
    let dataToBeDeleted = req.body
    let user = await userModel.findOneAndDelete(dataToBeDeleted);
    res.json({
        message: "data deleted successfully", 
        data: user       
    });
};
function getUserByid (req, res) {
    console.log(req.query);
    console.log(req.params.username);
    console.log(req.params);
    res.send("user id received");
};

async function getSignup(req, res, next) {
    let allUsers = await userModel.find();

    res.json({
        message: "list of all users",
        data: allUsers
    });
    next();
}

async function postSignup(req, res) {
    try {
        let dataObj = req.body;
        let user = await userModel.create(dataObj);
        console.log("my obj", user);
            
        res.json({
            message: "user signed up",
            data: user
        });   
    } catch(err) {
        console.log(err);
        res.status(400).json({error: err});
    }
}

// cookies.

function setCookies(req, res) {
    // res.setHeader('set-cookie', 'isLoggedIn = true');
    res.cookie('isLoggedIn', true,{maxAge: 1000+60+60+24, secure: true, httpOnly: true});
    res.cookie('isPrimeMember', true);
    res.send('cookies has been set');
}

function getCookies(req, res) {
    let cookies = res.cookies;
    console.log(cookies);
    res.send('cookies received')
}
