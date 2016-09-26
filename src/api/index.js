import { getJSON, applyQueryParameters } from '../core/http';

/**
 * @name   fetchCategories
 * @desc   Get the categories from Product Hunt
 * @param  {{ [key: string]: string|number }} params
 * @return {Promise<Array<Category>>}
 */
export function fetchCategories({ endpoint, headers } = {}) {
  return getJSON(`${endpoint}/categories`, { headers }).then(res => res.body);
}

/**
 * @name   fetchPosts
 * @desc   Get the posts from Product Hunt with given query parameters
 * @param  {{ [key: string]: string|number }} query
 * @param  {{ [key: string]: string|number }} headers
 * @return {Promise<any>}
 */
export function fetchPosts({ endpoint, query, headers } = {}) {
  return getJSON(applyQueryParameters(`${endpoint}/posts/all`, query), { headers }).then(res => res.body);
}
