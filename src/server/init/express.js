import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import logRequests from '../middlewares/logRequests';
import log from '../libs/logger';
import apiRouter from '../routers/api';

const app = express();

const PUBLIC = path.resolve('./public');

/**
 * In developement front-app must be delivered by webpack server middlewre. In prod, by a public folder.
 */
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(require('../../../webpack.dev'));
  app.use(webpackDevMiddleware(compiler));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(express.static(PUBLIC));
}

/**
 * Middlewares
 */
app.use(logRequests);

/**
 * Api Routes
 */
app.use('/api', apiRouter);

/**
 * Front-end app delivering.
 */
app.get('*', (req, res) => {
  res.sendFile(path.join(PUBLIC, 'index.html'));
});


app.listen(8080, () => log.info('Example app listening on port 8080!'));
