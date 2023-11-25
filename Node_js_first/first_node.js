/*console.log("hello world");

 const fs=require('fs');
fs.writeFileSync('Hello.text','hello from node js'); 

var http=require('http');

http.createServer(function(req,res){
    res.write('name');
    process.exit();
}).listen(4000)
*/

const http=require('http');

http.createServer(function(req,res){
    console.log(req.url , req.method,req.headers);
    
    //process.exit();
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title> My First Page</title></head>');
    res.write('<body>Welcome to my Node Js project</body>');
    res.write('</html>');
    res.end();
    



}).listen(4000)