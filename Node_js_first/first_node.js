/*console.log("hello world");

 const fs=require('fs');
fs.writeFileSync('Hello.text','hello from node js'); */

var http=require('http');

http.createServer(function(req,res){
    res.write('name');
    res.end()
}).listen(4000)