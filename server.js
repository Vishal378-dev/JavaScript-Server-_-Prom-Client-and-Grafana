const express= require("express");
const logger = require("./logger/log");
const morgan = require("morgan");
const responseTime=require("response-time")
require("dotenv").config()
const app=express()
const fs=require("fs")

app.use(morgan('combined'))
const client=require("prom-client")

const collectDefaultMetrices=client.collectDefaultMetrics
collectDefaultMetrices();
const reqResponseTime=new client.Histogram({
    name:"req_res_time",
    help:"Histogram of request response times in milliseconds",
    labelNames:["method","status","url"],
    buckets:[1,10,20,50,100,200,500,1000,2000]
})

app.use(responseTime((req,res,time)=>{
    reqResponseTime.labels({
        "method":req.method,"status":res.statusCode,
        "url":req.url
    }).observe(time)
}))

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.get("/xyz",async (req,res)=>{
    try{
        const randomInt = Math.floor(Math.random()*10)
        if(randomInt===8){
            throw new Error("Some Random Error")
        }
        let res2=await new Promise((resolve,reject)=>{setTimeout(()=>resolve("Success"),randomInt*100)}) 
        return res.status(200).json({result:true,msg:"Success",res2})
    }catch(err){
        return res.status(500).json({result:false,msg:"Internal Error"})
    }
})

app.get("/fileStats",(req,res)=>{
    fs.stat("./combined.log",(err,data)=>{
       if(err){
        return res.send(err)
       }else{
        if(data.size>=1000){
            fs.unlink("./combined.log",(err)=>{
                if(err && err.code == 'ENOENT') {
                    return res.send("File Does Not exist")
                }
                if(err){
                    return res.send(err)
                }else{
                    return res.send("Successfully Deleted the file")
                }
            })
        }
       }
    })  
})

const PORT = process.env.PORT || 7999

app.get("/",(req,res)=>{
    logger.info("hello")
    res.send("hello world")
})

const server = app.listen(PORT,()=>{
    console.log(`server is listening on - ${PORT}`)
})

function gracefullyShuttingDownTheServer(signal){
    console.log(`\nReceived ${signal} hence Shutting down the server`)
    server.close(()=>{
        console.log("closing all open http/https connections~~~ Bye ")
        process.exit(0)
    })
    setTimeout(()=>{
        console.log("Forcefully closing the connection.")
        process.exit(1)
    },10000)
}

process.on('SIGINT',gracefullyShuttingDownTheServer)
process.on('SIGTERM',gracefullyShuttingDownTheServer)

process.on('uncaughtException',(err)=>{
    console.error("Shutting down the server due to uncaught exception")
    console.log(err)
    process.exit(1)
})