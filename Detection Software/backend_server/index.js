const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();

var currentWebsite = "www.gooble.com"

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("hello world");
})

app.get("/getCurrent", (req, res) => {
    res.send(currentWebsite);
    //console.log("getCurrent");
})

app.get("/update/:query?", function(req, res){
    var query = req.params.query;
    let url = query.replaceAll("forward_slaaash", "/");
    let url2 = url.replaceAll("qwestun_murk", "?")
    currentWebsite = url2;
    //console.log("updated curr website to ", query);
    res.send("ok");
});

app.post('/write_to_json/', function(req, res) {
    var data = JSON.stringify(req.body);
    fs.writeFileSync('./frontend/src/lists.json', data);
});

app.listen(3000, () => console.log("Server for website detection and whitelist/blacklist API is listening on port 3000"));
