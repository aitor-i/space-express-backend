import http from 'http'
import {WebSocket, WebSocketServer} from 'ws'
import { UUID, randomUUID } from 'crypto'

 
interface Message { 
    messageId: UUID,
    status: 'messeag' | 'typing',
    message: string|undefined,
    userId:string,
    userAlias: string
    roomId: string
    isTyping:boolean
}

interface Response { 
    messageId?: UUID | null,
    status: 'messeag' | 'typing',
    message: Message|undefined,
    userId:string,
    userAlias: string
    roomId:string
    isTyping:boolean
}

export function runChatServer (server: http.Server, client: Set<WebSocket> ) { 
    const wss  = new WebSocketServer({server})

    wss.on("connection", (ws:WebSocket)=> { 
        
        console.log("WS: ", ws)

        // Get flight data 
        // Fetch prev data from DB
        const rooomId = ws.protocol;
        const prevMessages:Message[] =  [];
        client.add(ws)

        // Send de prev data as first message
        ws.send(JSON.stringify(prevMessages))
        
        ws.on("message", (message:string)=>{ 
            const parsedMessage = JSON.parse(message) as Message;
            console.log(parsedMessage);

            if(parsedMessage.status === 'typing'){ 
                const response: Response = { 
                    status: parsedMessage.status,
                    message: undefined,
                    userId: parsedMessage.userId,
                    userAlias: parsedMessage.userAlias,
                    roomId: parsedMessage.roomId,
                    isTyping: parsedMessage.isTyping,
                }
                const responseString = JSON.stringify(response)
                ws.send(responseString)
                return
            }

            const messageWithId = {...parsedMessage, messageId: randomUUID() };
            prevMessages.push(messageWithId);
            
            const textMessagesString = JSON.stringify(messageWithId);

            ws.send(textMessagesString)
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
