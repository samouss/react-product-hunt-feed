import { token } from '../../config.json';
import { getJSON } from '../core/http';

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
