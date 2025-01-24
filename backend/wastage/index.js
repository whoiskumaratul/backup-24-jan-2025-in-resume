// const http = require('http');
// http.createServer((req, resp ) => {
         
    //if we get response from user,angular,  react, vue then we will use req (get data through req)
    //API reponse send like if we send the data then we will use req
    
//      resp.writeHead(200, {'Content-Type': 'application\json'})
//      resp.write(JSON.stringify({name: 'Atul', email: 'kumaratuljaiswal222@gmail.com'}));
//      resp.end()
// }).listen(5000);

const express = require('express')
const app = express()

app.get('/', (req, resp) => {
    resp.send('welcome ')
    resp.end();
    
}).listen(5000) 

     

   



