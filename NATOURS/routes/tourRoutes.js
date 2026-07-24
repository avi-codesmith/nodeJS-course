import express from 'express';
import {
  getAllTours,
  getTourByID,
  addTour,
  updateTour,
  deleteTour,
  checkID,
} from '../controllers/tourControllers.js';

const app = express();

const router = express.Router();

router.param('id', checkID); // param middleware for path variable - 'id'
//  (seek for checkID to get more info)

router.route('/').get(getAllTours).post(addTour); // this is also a middleware

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
}); // middleware without any route specified
// but still a part of the middleware stack, execute for all requests

router.route('/:id').get(getTourByID).patch(updateTour).delete(deleteTour);

export default router;
