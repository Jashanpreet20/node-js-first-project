// const http=require('http');
// const server=http.createServer((req,res) =>{
//     const url=req.url;
//     console.log(url);
//    if(req.url === '/home')
//    {
//     res.end('welcome home');
//    }
//    else if(req.url === '/about')
//    {
//     res.end('welcome to about us page');
//    }else if(req.url === '/node')
//    {
//     res.end('welcome to my node js project');
//    }
// });


// server.listen(3000, () =>{
//     console.log('server run at 3000 port');
// })


const http=require('http');
const fs=require('fs');
const { buffer } = require('stream/consumers');
const server=http.createServer((req,res) =>{
    const url=req.url;
    const method=req.method;
    if(url === '/')
    {
        fs.readFile('new.txt', 'utf8', (err, data) => {
            if (err) {
              console.error(err);
            }
            console.log("data form file  " +data);
            res.write('<html>');
            res.write('<head><title>redirecting request</head></title>');
            res.write(`<body>${data}</body>`);
            res.write('<body><form action="/message" method="POST"><input type="text" name ="message"><button type="submit">send</button></form></body>')
            res.write('/<html>')
            return res.end();
          });

             // routing request 
       
    }
       
    

    // redirect request i mean ussi page pe waapis aa jana

    if(url === '/message' && method ==='POST'){

        //parsing request data or bodies
        const body=[];
        req.on('data',(chunk) =>{
            console.log(chunk);
            body.push(chunk);   
        });
        req.on('end' ,() =>{
            
            const parsebody=Buffer.concat(body).toString();
            console.log(parsebody);
            const message=parsebody.split("=")[1];
            //stored data into file
            fs.writeFileSync('new.txt',message);
            
        })
        //redirecting request 
        res.statusCode=302;
        res.setHeader('Location','/')
        return res.end();
    }
  
});


server.listen(3000, () =>{
    console.log('server run at 3000 port');
})