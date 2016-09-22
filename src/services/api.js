import { endpoint, token } from '../../config';
import { getJSON, applyQueryParameters } from '../core/http';

/**
 * @name   getCategories
 * @desc   Get the categories from Product Hunt
 * @param  {{ [key: string]: string|number }} params
 * @return {Promise<Array<Category>>}
 */
export function getCategories(params = {}) {
  return getJSONWithAuthorization(`${endpoint}/categories`, params.headers).then(res => {
    return res.body.categories;
  });
}

/**
 * @name   getPosts
 * @desc   Get the posts from Product Hunt with given query parameters
 * @param  {{ [key: string]: string|number }} query
 * @param  {{ [key: string]: string|number }} headers
 * @return {Promise<any>}
 */
export function getPosts({ query, headers } = {}) {
  return getJSONWithAuthorization(applyQueryParameters(`${endpoint}/posts/all`, query), headers).then(res => {
    return res.body.posts;
  });
}

/**
 * @name   getJSONWithAuthorization
 * @desc   Perform a JSON request through Http module with headers Authorization injected
 * @param  {string}                    endpoint
 * @param  {{ [key: string]: string }} headers
 * @return {Promise<any>}
 */
export function getJSONWithAuthorization(endpoint, headers = {}) {
  return getJSON(endpoint, {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  });
}
