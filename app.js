var express = require('express');
var app = express();
var fs = require("fs");

app.get('/theftData', function (req, res) {
   fs.readFile( "assets/theft.json", 'utf8', function (err, data) {
        console.log('Theft API Call');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.end( data );
   });
})

app.get('/assaultData', function (req, res) {
    fs.readFile( "assets/assault.json", 'utf8', function (err, data) {
        console.log('Assault API Call');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.end( data );
    });
 })

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)

})