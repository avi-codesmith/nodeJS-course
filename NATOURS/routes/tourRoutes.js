import express from 'express';
import {
  getAllTours,
  getTourByID,
  addTour,
  updateTour,
  deleteTour,
} from '../controllers/tourControllers.js';

const app = express();

const router = express.Router();

router.route('/').get(getAllTours).post(addTour); // this is also a middleware

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
}); // middleware without any route specified
// but still a part of the middleware stack, execute for all requests

router.route('/:id').get(getTourByID).patch(updateTour).delete(deleteTour);

export default router;
