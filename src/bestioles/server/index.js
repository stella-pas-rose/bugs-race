import http from 'http'; 
import { Server as IOServer } from 'socket.io';
import requestController from "./controllers/requestController.js"
import IOController from './controllers/ioController.js';

console.log("server");

const server = http.createServer(
    async (request, response) => { 
        const ctr = new requestController(request, response);
        await ctr.handleRequest(); 
    }
);

const io = new IOServer(server);
const ioController = new IOController(io);

io.on('connect', (socket) => ioController.registerSocket(socket) );
server.listen(8080); 