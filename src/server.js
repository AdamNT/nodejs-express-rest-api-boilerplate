import http from 'http';
import https from 'https';
// import fs from 'fs';
import debug from 'debug';
import dotenv from 'dotenv';

import app from './app';

const errorLog = debug('app:error');
const log = debug('app:log');
dotenv.config({ path: '../.env' });

/**
 * Normalize a port into a number, string, or false.
 * @param {number} [portValue=3000]
 * @returns {number} that number port.
 */

const normalizePort = (portValue) => {
  const port = parseInt(portValue, 10);

  if (isNaN(port)) {
    // named pipe
    return portValue;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const { NODE_ENV = 'development', PORT, SSL = false } = process.env;
const port = normalizePort(PORT || 3000);

app.set('port', port);
app.set('env', NODE_ENV);

const cert = {
  key: {}, // fs.readFileSync('./key.pem'), // server.key
  cert: {}, // fs.readFileSync('./cert.pem'), // server.cert
};

const server = SSL ? https.createServer(cert, app) : http.createServer(app);
server.listen(port);

server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      errorLog(`${bind} requires elevated privileges`);
      process.exit(1);
      break;

    case 'EADDRINUSE':
      errorLog(`${bind} is already in use`);
      process.exit(1);
      break;

    default:
      throw error;
  }
});

server.on('listening', () => {
  log(
    `Server listening on: ${
      SSL ? 'https://' : 'http://'
    }localhost:${port}\nENV: ${NODE_ENV}`
  );
});
