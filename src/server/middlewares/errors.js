import { sendError } from '../libs/responses';
import log from '../libs/logger';

export default function (err, req, res, next) {
  log.error(err.stack);
  sendError(res, err);
}
