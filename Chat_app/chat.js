const http=require('http');
const fs=require('fs');

http.createServer(function(req,res){
    const url=req.url;
    const method=req.method;
    
    if(url==="/"){
        res.write('<html>');
        res.write('<head><title> My First Page</title></head>');
        res.write('<body><form action="/message" method ="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();

    }
    if(url==="/message" && method === 'POST'){
        const body=[]
        req.on('data',(chunk)=>{
            body.push(chunk);

        });
        req.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString();
            const message=parsedBody.split('=')[1];
            fs.writeFileSync('message.txt',message);

        });
        
        res.statusCode=302;
        res.setHeader('Location','/');
        return res.end();

    }
    
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title> My First Page</title></head>');
    res.write('<body>Welcome to my Node Js project</body>');
    res.write('</html>');
    res.end();
    



}).listen(4000)