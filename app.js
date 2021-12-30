const Koa = require('koa')
router = require('koa-router')()
// const DB = require('./assets/js/mongoDB.db.js')
const app = new Koa()
const webSocket = require('ws')
const ws = new webSocket.Server({port: 9105})
let clients = []
ws.on('connection',(client,req)=> {
  
  client.on('message', msg => {
    console.log('msg:'+msg);
    // DB.add("info",{"msg":msg})
    // DB.find("info").then(res => {
      
    // })
    
    client.send('information from the server')
  })
})

app.listen(3000)