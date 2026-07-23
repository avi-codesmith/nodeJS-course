import express from 'express';
import fs from 'fs';

// Create an Express application
const app = express();

app.use(express.json());
// We need this middleware to parse JSON data sent by the client (will available in req.body)
// It make available data on server side
// Without middleware sending data from client can't be happend

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

//NATOURS CODE ==========================================================================================================================

let tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));
// We have to convert parse the data into Obj, bcz streams it is in text format

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
};

const getTourByID = (req, res) => {
  const id = req.params.id * 1; // for ex 2, 3, 5, 9, 1, 4

  const tour = tours.find((tour) => tour.id === id);

  // if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      data: `Invalid ID - ${id}`,
    });
  }

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

const addTour = (req, res) => {
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);
  console.log(newTour);
  tours.push(newTour);

  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      if (err) return console.log(err);

      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    },
  );
};

const updateTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'failed',
      data: `Invalid ID - ${id}`,
    });
  }

  const newData = req.body;
  const reqTour = tours.find((tour) => tour.id === id);

  const updatedTour = Object.assign(reqTour, newData);

  tours.push(updatedTour);

  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      if (err) return console.log(err);

      res.status(201).json({
        status: 'success',
        data: {
          tour: updatedTour,
        },
      });
    },
  );
};

const deleteTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: 'failed',
      data: `Invalid ID - ${id}`,
    });
  }

  tours = tours.filter((tour) => tour.id !== id);

  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      if (err) return console.log(err);

      res.status(204).json({
        status: 'success',
        message: `Given tour has been deleted, id = ${id}`,
        data: null,
      });
    },
  );
};

// app.get('/api/v1/tours', getAllTours); // Handle get request
// app.get('/api/v1/tours/:id', getTourByID); // Handle get request on url parameters
// app.post('/api/v1/tours', addTour); // hanlde post request
// app.patch('/api/v1/tours/:id', updateTour); // hanlde patch request
// app.delete('/api/v1/tours/:id', deleteTour); // hanlde delete request

// a better approach:

app.route('/api/v1/tours').get(getAllTours).post(addTour);

app
  .route('/api/v1/tours/:id')
  .get(getTourByID)
  .patch(updateTour)
  .delete(deleteTour);

const port = 8000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
