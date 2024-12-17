process.env.DEBUG = 'socket.io:*';

import { connectToDatabase } from '../core/database';
import { PORT } from '../core/constants';
import dotenv from 'dotenv';
import http from 'http';
import app from '../app/app';


dotenv.config();



const server = http.createServer(app);
console.log('Using HTTP');


server.timeout = 60000;

server.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await connectToDatabase();
});


server.on("error", (err) => {
    console.error(err);
    process.exit(1);
});

process.on("uncaughtException", (ev) => {
    console.error(ev.stack);
    process.exit(1);
});