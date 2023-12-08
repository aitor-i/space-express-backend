import { UUID, randomUUID } from 'crypto'

export interface Message { 
    messageId: UUID,
    status: 'message' | 'typing',
    message: string|undefined,
    userId:string,
    userAlias: string
    roomId: string
    isTyping:boolean
}

export interface RequestMessage{ 

    status: 'message' | 'typing',
    message: Message|undefined,
    isTyping:boolean
    typingObject?: TypingObject
}

export interface TypingObject{ 

    userId:string,
    userAlias: string
    roomId:string
}

export interface Response { 
    status: 'message' | 'typing',
    message: Message[]|undefined,
    isTyping:boolean
    typingObject?: TypingObject
}
