import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { loginRouter } from './service/routers/loginRouter';
import { selectSeatRouter } from './service/routers/selectSeatRouter';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { ipBlackListValidationMiddleware } from './service/middleware/ipBlackListValidationMiddleware';
import { runChatServer } from './chat/service/runChatServer';
import {WebSocket } from 'ws'
dotenv.config();

const app = express();
const chat = express();


const corsUrl = process.env.CORS_URL;
app.use(
    cors({
        origin: corsUrl,
        credentials: true
    })
);

app.use(ipBlackListValidationMiddleware);
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/space-express/auth', loginRouter);
app.use('/api/space-express/select-seat/', selectSeatRouter);

app.use('*', (req, res) => {
    console.log(req.path);
    console.log(req.body);
    res.status(404).json({ message: 'Not found!' });
});

app.listen(4000, () => {
    console.log('listening on port 4000!');
});

const chatServer = chat.listen(4001, () => { 
    console.log("Chat server listening on port 4001!")
})



const clients= new Set<WebSocket>;
runChatServer(chatServer, clients )

