import http from 'http'
import {WebSocket, WebSocketServer} from 'ws'

export function runChatServer (server: http.Server, client: Set<WebSocket> ) { 
    const wss  = new WebSocketServer({server})

    wss.on("connection", (ws:WebSocket)=> { 
        
        console.log("WS: ", ws)

        // Get flight data 
        // Fetch prev data from DB
        const prevMessages:string[] =  [];
        client.add(ws)

        // Send de prev data as first message
        ws.send(JSON.stringify(prevMessages))
        
        ws.on("message", (message:string)=>{ 
            const parsedMessage = JSON.parse(message);
            console.log(parsedMessage);

            prevMessages.push(parsedMessage);

            ws.send(parsedMessage.message)
        })


        ws.on("close", ()=> { 
            // Persist data on BD
    
            console.log("chat closed!!", prevMessages)
        })



        
        
    })


    wss.on("error", (err)=>{ 
        console.log(err)

    })

}
