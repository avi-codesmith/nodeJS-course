import fs from 'fs';

let tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));
// we get value parameter which tells about the value of the path variable in this "id"

const checkID = (req, res, next, val) => {
  if (val > tours.length) {
    return res.status(404).json({
      status: 'failed',
      data: `Invalid ID - ${val}`,
    });
  }
  console.log(`ID is ${val}`);
  next();
}; // param middleware handler or controller

const getAllTours = (req, res) => {
  console.log(req.requestTime); // getting stored value from req object
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

const getTourByID = (req, res) => {
  const id = req.params.id * 1; // for ex 2, 3, 5, 9, 1, 4

  const tour = tours.find((tour) => tour.id === id);

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

export { getAllTours, getTourByID, addTour, updateTour, deleteTour, checkID };
