/**
 * @name   http
 * @desc   Perfom a request through the fetch API.
 * @param  {string}                    endpoint
 * @param  {string}                    method
 * @param  {{ [key: string]: string }} headers
 * @return {Promise<any>}
 */
export function http({ endpoint, method, headers = {} }) {
  return fetch(endpoint, { method, headers }).catch(error => {
    return Promise.reject({ key: 'FETCH.ABORT', error });
  });
}

/**
 * @name   getJSON
 * @desc   Perform a JSON request through the fetch API.
 * @param  {string}       endpoint
 * @param  {object}       params
 * @return {Promise<any>}
 */
export function getJSON(endpoint, params) {
  return http({ ...params, method: 'GET', endpoint }).then(res => {
    return responseJSON(res);
  });
}

/**
 * @name   responseJSON
 * @desc   Parse the JSON and return a promise depends on the following:
 *         Return a resolved promise in case of success (code: 200 - 299)
 *         Return a rejeced promise in case of error (code: >300)
 * @param  {FetchResponse} response
 * @return {Promise<any>}
 */
export function responseJSON(response) {
  return parseJSON(response).then(json => {
    const res = { body: json, response };

    if (!response.ok) {
      return Promise.reject({ ...res, key: 'FETCH.FAILED' });
    }

    return { ...res, key: 'FETCH.SUCCESS' };
  });
}

/**
 * @name   parseJSON
 * @desc   Wrap the result of .json() and in case of error return a reject promise with meta information
 * @param  {FetchResponse} response
 * @return {Promise<any>}
 */
export function parseJSON(response) {
  return response.json().catch(error => {
    return Promise.reject({ key: 'FETCH.PARSE', error });
  });
}
