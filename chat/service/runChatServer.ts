import http from 'http'
import {WebSocket, WebSocketServer} from 'ws'

import { Message, Response } from '../domain/types';
import { onMessageHandler } from './onMessageHandler';
 

const prevMessages:Message[] =  [];

export function runChatServer (server: http.Server, client: Set<WebSocket> ) { 
    const wss  = new WebSocketServer({server})

    wss.on("connection", (ws:WebSocket)=> { 
        
        // Get flight data 
        // Fetch prev data from DB
        const roomId = ws.protocol;

        const prevMessagesFromRoomId = prevMessages.filter(message => message.roomId === roomId)
        const firstMessagesResponse: Response = { 
           status: 'message',
            message: prevMessagesFromRoomId,
            isTyping:false,
        }


        ws.send(JSON.stringify(firstMessagesResponse))
        console.log("First message: ", firstMessagesResponse)
        client.add(ws)

        
        ws.on("message", (message:string)=>{ onMessageHandler(message, ws)} )

        ws.on("close", ()=> { 
            // Persist data on BD
    
            console.log("chat closed!!", prevMessages)
        })
    })

    wss.on("error", (err)=>{ 
        console.log(err)

    })

}
