import { endpoint, token } from '../../config';
import { getJSON } from '../core/http';

/**
 * @name   getCategories
 * @desc   Get the categories from Product Hunt
 * @param  {object}                   params
 * @return {Promise<Array<Category>>}
 */
export function getCategories(params = {}) {
  return getJSONWithAuthorization(`${endpoint}/categories`, params.headers).then(res => res.body);
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
