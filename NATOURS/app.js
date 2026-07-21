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
