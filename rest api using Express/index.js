const express = require('express');
const app = express();

//use() is used for attaching or mount the middleware
//express.json() is a middleware and it is a body parser ...jo kuch body ma rakh kr send krega usko hum is ki help se view kr sakhta ha....
app.use(express.json());

app.get('/api/',(req,res)=>{
    res.send("Welcome TO Home Page Entry Point!")

})
app.get('/api/users',(req,res)=>{
    res.send("Welcome to Users Get!")

})

// post request
//post request used for sending data from the frontend to server
app.post('/api/users',(req,res)=>{
    const body=req.body;
    // console.log(`post hits and Body`, body)
    res.json({
        status:true,
        message:`welcome to Users ${body.name}`,
        data:body
    })
    
})




//listen() is used for listening the visitors on the specific Ip address or Port
app.listen(2000,()=>{
    console.log("Server Is Running on Localhost:2000");
})