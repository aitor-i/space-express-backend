import http from 'http'
import {WebSocket, WebSocketServer} from 'ws'
 
interface Message { 
    status: 'messeag' | 'typeing',
    message: string|undefined,
    userId:string,
    userAlias: string
    roomId: string
}

interface Response { 
    status: 'messeag' | 'typeing',
    messages: Message[]|undefined,
    userId:string,
    userAlias: string
    roomId:string
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

            if(parsedMessage.status === 'typeing'){ 
                const response: Response = { 
                    status: 'typeing',
                    messages: undefined,
                    userId: parsedMessage.userId,
                    userAlias: parsedMessage.userAlias,
                    roomId: parsedMessage.roomId
                }

                const responseString = JSON.stringify(response)
                ws.send(responseString)
                return
            }

            prevMessages.push(parsedMessage);
            
            const textMessages = prevMessages.filter(message => message.message !== undefined)
            const textMessagesString = JSON.stringify(textMessages)

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
