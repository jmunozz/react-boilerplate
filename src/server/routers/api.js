import express from 'express';
import bodyParser from 'body-parser';

import errors from '../middlewares/errors';
import logRequests from '../middlewares/logRequests';

// Create router
const router = express.Router();


// Middlewares
router.use(logRequests);
router.use(bodyParser.json());

// Routes
// Write all routes here

// Errors
router.use(errors);

export default router;
