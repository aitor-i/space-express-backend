
import {WebSocket, WebSocketServer} from 'ws'
import { UUID, randomUUID } from 'crypto'

export const onMessageHandler = (message:string, ws:WebSocket)=>{ 

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
}
