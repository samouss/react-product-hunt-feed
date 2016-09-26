/**
 * @name   http
 * @desc   Perfom a request through the fetch API.
 * @param  {string}                    endpoint
 * @param  {string}                    method
 * @param  {string}                    body
 * @param  {{ [key: string]: string }} headers
 * @return {Promise<any>}
 */
export function http(endpoint, { method, body, headers = {} }) {
  const params = { method, headers };

  if (body) {
    params.body = body;
  }

  return fetch(endpoint, params).catch(error => {
    return Promise.reject({ key: 'FETCH.ABORT', error });
  });
}

/**
 * @name   getJSON
 * @desc   Perform a GET request with JSON through the fetch API.
 * @param  {string}       endpoint
 * @param  {object}       params
 * @return {Promise<any>}
 */
export function getJSON(endpoint, params) {
  return http(endpoint, { ...params, method: 'GET' }).then(res => {
    return responseJSON(res);
  });
}

/**
 * @name   postJSON
 * @desc   Perform a POST request with JSON through the fetch API.
 * @param  {string}       endpoint
 * @param  {object}       params
 * @return {Promise<any>}
 */
export function postJSON(endpoint, { body, headers, ...rest } = {}) {
  return http(endpoint, {
    ...rest,
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      ...headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(res => {
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

/**
 * @name   applyQueryParameters
 * @desc   Return the given endpoint with query parameters apply on it
 * @param  {string}                          endpoint
 * @param  {{ [key:string]: string|number }} parameters
 * @return {string}
 */
export function applyQueryParameters(endpoint, parameters = {}) {
  return Object.keys(parameters).reduce((acc, key, index) => {
    const suffix = (index === 0) ? '?' : '&';
    const pair = `${suffix}${encodeURI(`${key}=${parameters[key]}`)}`;

    return acc + pair;
  }, endpoint);
}

/**
 * @name   trimQueryParameters
 * @desc   Return the given endpoint without any query parameters
 * @param  {string} endpoint
 * @return {string}
 */
export function trimQueryParameters(endpoint) {
  const index = endpoint.indexOf('?');

  if (index === -1) {
    return endpoint;
  }

  return endpoint.substring(0, index);
}
