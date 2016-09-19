/**
 * @name   http
 * @desc   Perfom a request through the fetch API.
 *         Return a resolved promise in case of success (code: 200 - 299)
 *         Return a rejeced promise in case of error (code: >300) and request abort
 * @param  {string}                    endpoint
 * @param  {string}                    method
 * @param  {{ [key: string]: string }} headers
 * @return {Promise<FetchResponse>}
 */
export function http({ endpoint, method, headers = {} }) {
  return fetch(endpoint, { method, headers }).then(res => {
    if (!res.ok) {
      return Promise.reject(res);
    }

    return res;
  });
}
