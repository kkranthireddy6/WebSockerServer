const express = require('express')
const http = require('http')
const webSocket = require('ws')
const cors = require('cors')

const app = express()
app.use(cors())

const server = http.createServer(app)
const wss = new webSocket.Server( {server})

wss.on('connection', (ws)=> {
    console.log('New client connected')

    ws.on('message', (message)=> {
        console.log(`Received message', ${message}`)

        wss.clients.forEach((client)=>{
            if(client.readyState === webSocket.OPEN){
                client.send(message.toString())
            }
        })
    })

    ws.on('close', ()=>{
        console.log('Client disconnected')
    })
})

const port = 5000
server.listen(port, ()=>{
    console.log(`server was listening on the port : ${port}`)
})

