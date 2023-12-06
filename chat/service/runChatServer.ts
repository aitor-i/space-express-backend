import http from 'http'
import {WebSocket, WebSocketServer} from 'ws'
import { UUID, randomUUID } from 'crypto'

 
interface Message { 
    messageId: UUID,
    status: 'message' | 'typing',
    message: string|undefined,
    userId:string,
    userAlias: string
    roomId: string
    isTyping:boolean
}

interface RequestMessage{ 

    status: 'message' | 'typing',
    message: Message|undefined,
    isTyping:boolean
    typingObject?: TypingObject
}

interface TypingObject{ 

    userId:string,
    userAlias: string
    roomId:string
}

interface Response { 
    status: 'message' | 'typing',
    message: Message[]|undefined,
    isTyping:boolean
    typingObject?: TypingObject
}

export function runChatServer (server: http.Server, client: Set<WebSocket> ) { 
    const wss  = new WebSocketServer({server})

    wss.on("connection", (ws:WebSocket)=> { 
        
        // Get flight data 
        // Fetch prev data from DB
        const roomId = ws.protocol;
        const prevMessages:Message[] =  [];

        const prevMessagesFromRoomId = prevMessages.filter(message => message.roomId === roomId)
        const firstMessagesResponse: Response = { 
           status: 'message',
            message: prevMessagesFromRoomId,
            isTyping:false,
        }

        ws.send(JSON.stringify(firstMessagesResponse))
    
        client.add(ws)

        // Send de prev data as first message
        ws.send(JSON.stringify(prevMessages))
        
        ws.on("message", (message:string)=>{ 
            
            const parsedRequest = JSON.parse(message) as RequestMessage;
            console.log("Parsed reques!!!: ", parsedRequest)

            if(parsedRequest.status === 'typing'){ 
                console.log("Typing!!!!")
                const response: Response = { 
                    status: parsedRequest.status,
                    message: undefined,
                    isTyping: true,
                }
                
                const responseString = JSON.stringify(response)
                ws.send(responseString)
                return
            }

            if(parsedRequest.message === undefined) return;
            parsedRequest.message.messageId = randomUUID();
            prevMessages.push(parsedRequest.message);
            
            console.log("Prev messages: ", prevMessages)
            const responseMessage: Response = { 
                status: 'message',
                message: prevMessages,
                isTyping: false
            }
            const textMessagesString = JSON.stringify(responseMessage);
            console.log("Response to messgae: ", responseMessage)

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
