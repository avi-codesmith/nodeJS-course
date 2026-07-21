import express from 'express';

// Create an Express application
const app = express();

// Handle GET requests to the root route ('/')
app.get('/', (req, res) => {
  // Send a JSON response with HTTP status 200 (OK)
  res.status(200).json({
    message: 'Hello from the server side',
    app: 'Natours',
  });
});

// Handle POST requests to the root route ('/')
app.post('/', (req, res) => {
  res.status(200).send('You can post to this endpoint!');
});

const port = 8000;

// Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

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
       
 👉 API usually retrun JSON data.

*/
