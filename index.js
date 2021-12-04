var express = require('express');
var fs = require('fs');
var app = express();
var port = 8888;
var cors = require('cors');


// Use middlewares to set view engine and post json data to the server
app.use(express.static('public'));
app.use(cors({
    origin: '*'
}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const frontEndPath = __dirname + "/../frontend/dist/fuse";
app.use(express.static(frontEndPath));
app.get('*', (req, res)=>{
    const html = fs.readFileSync(frontEndPath + '/index.html').toString('utf8')
    res.send(html);
});

app.listen(port, ()=>{
    console.log('Server is running on Port: ', port);
});
