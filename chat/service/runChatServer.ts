import http from 'http'
import {WebSocket, WebSocketServer} from 'ws'

export function runChatServer (server: http.Server, client: Set<WebSocket> ) { 
    const wss  = new WebSocketServer({server})

    wss.on("connection", (ws:WebSocket)=> { 
        console.log("connection!")

        
        
    })


}
