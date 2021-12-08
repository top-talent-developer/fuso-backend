require('dotenv').config()
var express = require('express');
var fs = require('fs');
var app = express();
var port = process.env.PORT || 8888;
var cors = require('cors');
console.log(port)

// Use middlewares to set view engine and post json data to the server
app.use(express.static('public'));
app.use(cors({
    origin: '*'
}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const frontEndPath = __dirname + "/../frontend/dist/fuse";
app.use(express.static(frontEndPath));
const frontEndPath2 = __dirname + "/../frontend_react_old/build";
app.use(express.static(frontEndPath2));
app.get('/v2', (req, res)=>{
    const html = fs.readFileSync(frontEndPath2 + '/index.html').toString('utf8')
    res.send(html);
});

app.get('/dashboard', (req, res)=>{
    const html = fs.readFileSync(frontEndPath + '/index.html').toString('utf8')
    res.send(html);
});

app.listen(port, ()=>{
    console.log('Server is running on Port: ', port);
});
