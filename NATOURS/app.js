import express from 'express';
import morgan from 'morgan';

import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';

export const app = express(); // Create an Express application

//THIRD PARTY MIDDLEWARES IN PRACTISE ===================================================================================================================

app.use(morgan('dev'));

//MIDDLEWARES IN PRACTISE ===================================================================================================================

app.use(express.json());
// We need this middleware to parse JSON data sent by the client (will available in req.body)
// It make available data on server side
// Without middleware sending data from client can't be happend

// some other middlewares
// middleware follow code structure

// app.use((req, res, next) => {
//   console.log('Hello from the middleware');
//   next(); // go to next middleware
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString(); // storing value to req object
  next(); // go to next middleware, do not block the RRC
});

//INTRODUCTION ==========================================================================================================================

// Handle GET requests to the root route ('/')
// app.get('/', (req, res) => {
//   // Send a JSON response with HTTP status 200 (OK)
//   res.status(200).json({
//     message: 'Hello from the server side',
//     app: 'Natours',
//   });
// });

// Handle POST requests to the root route ('/')
// app.post('/', (req, res) => {
//   res.status(200).send('You can post to this endpoint!');
// });

// const port = 8000;

// Start the server and listen for incoming requests
// app.listen(port, () => {
//   console.log(`App running on port ${port}`);
// });
//

//REST API DESIGN//

// POST   | /tours/  |
// GET    | /tours/2 |
// PACH   | /tours/2 |
// PUT    | /tours/2 |
// DELETE | /tours/2 |

/*

 👉 pathname or resource is always noun not verb
    convention and easy to manage if we use noun

 👉 Rest api always be stateless, 
     - Every request is independent.
     - The server does NOT remember previous requests.
     - Each request must contain everything needed 
       (authentication token, body, parameters, etc.).
       
 👉 API usually, mostly retrun JSON data.

*/

//NATOURS CODE (API HANDLING) ==========================================================================================================================

//MORE MIDDLEWARES ==========================================================================================================================

// app.get('/api/v1/tours', getAllTours); // Handle get request
// app.get('/api/v1/tours/:id', getTourByID); // Handle get request on url parameters
// app.post('/api/v1/tours', addTour); // hanlde post request
// app.patch('/api/v1/tours/:id', updateTour); // hanlde patch request
// app.delete('/api/v1/tours/:id', deleteTour); // hanlde delete request

app.use('/api/v1/tours/', tourRouter);
app.use('/api/v1/users/', userRouter);
// Mounting means attaching a router to the Express app at a base path,
// so the router handles all the remaining routes after that base path.

/*MIDDLEWARE SUMMARY ==========================================================================================================================

- Middlewares hanlde the incoming data from client side.
- app.get(), app.use(), app.param are some middlewares
- A buch of middleware is known as "Middleware Stack"
- Execution of middlewares follow a order that we declare in our code
- The process of sending request from client to server
  and sending back response to client 
  is known as "request-response cycle"
*/
