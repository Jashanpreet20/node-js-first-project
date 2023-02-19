const http=require('http');
const server=http.createServer((req,res) =>{
    const url=req.url;
    console.log(url);
   if(req.url === '/home')
   {
    res.end('welcome home');
   }
   else if(req.url === '/about')
   {
    res.end('welcome to about us page');
   }else if(req.url === '/node')
   {
    res.end('welcome to my node js project');
   }
});


server.listen(3000, () =>{
    console.log('server run at 3000 port');
})