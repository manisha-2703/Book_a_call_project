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
    const url=req.url;
    
    if(url==="/home"){
        res.write('<html>');
        res.write('<head><title> My First Page</title></head>');
        res.write('<body>Welcome home</body>');
        res.write('</html>');
        return res.end();

    }
    if(url==="/about"){
        res.write('<html>');
        res.write('<head><title> My First Page</title></head>');
        res.write('<body>Welcome to About Us page</body>');
        res.write('</html>');
        return res.end();

    }
    if(url==="/node"){
        res.write('<html>');
        res.write('<head><title> My First Page</title></head>');
        res.write('<body>Welcome to my Node Js project</body>');
        res.write('</html>');
        return res.end();

    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title> My First Page</title></head>');
    res.write('<body>Welcome to my Node Js project</body>');
    res.write('</html>');
    res.end();
    



}).listen(4000)