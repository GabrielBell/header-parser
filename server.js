var express= require("express")
var app= express()
var path = require("path");

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"))
})

app.get('/api', function(req,res){
    var lang= req.headers["accept-language"].split(",")[0];
    var clientIP= req.headers["x-forwarded-for"];
    var rawOS= req.headers["user-agent"];
    
    var pattern= /\(([^)]+)\)/;
    if(!pattern.test(rawOS)){
      res.json({"os": "could not extract OS", "ipaddress":clientIP, "language": lang})
    }
    var operatingSystem= pattern.exec(rawOS)
    
    res.json({"os": operatingSystem[1], "ipaddress":clientIP, "language": lang})
})

app.listen(process.env.PORT, function () {
  console.log('server running on port 8080')
})