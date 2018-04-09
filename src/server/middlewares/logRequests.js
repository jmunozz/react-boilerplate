import log from '../libs/logger';

export default function logRequests(req, res, next) {
  log.info(req.method, req.originalUrl);
  next();
}

