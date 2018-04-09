import express from 'express';
import bodyParser from 'body-parser';

import * as rooms from './rooms';
import errors from '../middlewares/errors';
import logRequests from '../middlewares/logRequests';
import { NotFoundError } from '../classes/validationError';

// Create router
const router = express.Router();


// Middlewares
router.use(logRequests);
router.use(bodyParser.json());

// Routes
// Write all routes here
router.use(() => {
  throw new NotFoundError('Endpoint does not exsits');
});

// Errors
router.use(errors);

export default router;
