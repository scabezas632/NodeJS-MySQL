
import Server from './server/server';

const server = Server.init( 3000 );

server.start( ()=>{
    console.log('Servidro corriendo en el puerto 3000');
});

