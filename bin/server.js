'use strict'

const app = require('../src/app');
const debug = require('debug')('marco:server');
const http = require('http');

const port = normalizePort(process.env.PORT || '3000');
app.set('port',port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log('API rodando na porta ' + port);

//Normalização para utilizar porta disponível
function normalizePort(val){
    const port = parseInt(val, 10);

    if(isNaN(port)){
        return val;
    }

    if(port >=0){
        return port;
    }

    return false;
}


//Tratamento de erro
function onError(error){
    if(error.syscall !== 'listen'){
        throw error;
    }

    const bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

    switch (error.code){
        case 'EACCES':
            console.error(bind + 'requerimento de alto privilégio');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            conseole.error(bind + 'is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
 }


 function onListening(){
    const addr = server.address();
    const bind = typeof addr === 'string' ?
      'pipe ' + addr :
      'port ' + addr.port;
    debug('listening on ' + bind);
 }