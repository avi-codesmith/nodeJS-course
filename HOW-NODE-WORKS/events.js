////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// EventEmitter │
//              ▼
import http from 'node:http';
import EventEmitter from 'node:events'; // import EventEmitter module

class Auth extends EventEmitter {
  constructor() {
    super();
  }
} // It is a good practise to make a class constructor

const myEmmitter = new Auth(); // making emmiter object

myEmmitter.on('Signin', () => {
  console.log('This is signin window');
}); // adding event listners

myEmmitter.on('Signin', () => {
  console.log("This is google's signin window");
}); // adding more

myEmmitter.on('Signin', (email) => {
  console.log(email);
});

myEmmitter.emit('Signin', 'abc@example.com'); // Emmiting (triggering) 'Signin' Emmitter

//////////////////////
// Emmiting on server

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('Request Recieved');
  res.end('Request Recieved');
});

server.on('request', () => {
  console.log('Another Request');
});

server.on('close', () => {
  console.log('Server closed');
});

server.listen(8070, '127.0.0.1', () => {
  console.log('Listening all request at port 8070');
});

// server.close(); // for closing the server

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// Why not this │
//              ▼

const Emmitter = (email) => {
  console.log(email);
};

const EmmitterSame = () => {
  console.log('Opens a window');
};

const EmmitterSame2 = () => {
  console.log("Opens a google's window");
};

Emmitter('xyz@example.com');
EmmitterSame();
EmmitterSame2();

// negatives    ▲
// didn't find  │
// given below  ▼

/* Benefits of using EventEmitter and negatives of using functions in this case (...!)

   - Register multiple listeners for the same event. 
     (each function mannualy be called!)

   - Easy to maintain (each listener is independent). 
     (not easy to maintain need code modifying!)

   - Loosely coupled (the emitter doesn't know who is listening). 
     (tightly coupled!)

   - Easy to add or remove listeners without modifying existing code.
     (have to modify related code!)

   - Easy to extend functionality by adding new listeners. 
     (new function need to be called!)

*/
