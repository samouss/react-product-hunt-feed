import { Router } from 'express';
import request from 'request-promise';

const endpoint = process.env.PRODUCT_HUNT_ENDPOINT || 'https://api.producthunt.com/v1';
const token = process.env.PRODUCT_HUNT_TOKEN || 'yourSecretToken';

const router = Router();

const proxy = (response, options) =>
  request({
    ...options,
    uri: endpoint + options.uri,
    resolveWithFullResponse: true,
    json: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => {
    response.status(res.statusCode).json(res.body);
  }).catch(err => {
    response.status(err.statusCode).json(err.error);
  });

router.get('/categories', (req, res) => {
  return proxy(res, {
    uri: '/categories',
  });
});

router.get('/posts', (req, res) => {
  const qs = req.query;

  return proxy(res, {
    uri: '/posts/all',
    qs,
  });
});

export default router;
