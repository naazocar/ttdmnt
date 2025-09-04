import { Router } from 'express';
import {
  getAllFlights,
  getFlightByCode,
  createFlight,
  updateFlight,
  deleteFlight
} from '../controllers/flightController';

const router = Router();

// Base route: /api/flights

// GET /api/flights - Get all flights
router.get('/', getAllFlights);

// GET /api/flights/:flightCode - Get flight by flight code
router.get('/:flightCode', getFlightByCode);

// POST /api/flights - Create new flight
router.post('/', createFlight);

// PUT /api/flights/:flightCode - Update flight
router.put('/:flightCode', updateFlight);

// DELETE /api/flights/:flightCode - Delete flight
router.delete('/:flightCode', deleteFlight);

export default router;
