const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const employeeRouter = require('./routes/EmployeeRoute')
const DB_URL = "mongodb+srv://nate_power:Password-true7@fullstackdevelopmentcom.ucpu5.mongodb.net/f2021_comp3123?retryWrites=true&w=majority"
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

let corsOptions = {
    origin: "http://localhost:3000"
}

app.use(cors(corsOptions))

mongoose.Promise = global.Promise;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Employee Backend - Assignment 2</h1>");
});

app.use(employeeRouter);

app.listen(9090, () => {
    console.log("Server is listening on port 9090");
});