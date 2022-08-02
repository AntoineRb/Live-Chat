import express from 'express';
import http from 'http';
import { Server } from "socket.io";

const app = express();

const server = new http.Server( app )

const io = new Server( server )

const PORT = process.env.PORT || 3000;

app.get("/", ( req, res ) => {
   res.sendFile( __dirname + "/index.html" );
});

io.on('connection', ( socket ) => {

    socket.on( "chat message", ( msg ) => {
       console.log( 'message: ' + msg )
        io.emit( 'chat message', msg )
    });
   socket.on( 'disconnect', () => {
       console.log( 'User Disconnected')
   })
});


server.listen( PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
})