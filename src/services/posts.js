/**
 * @name   normalizePost
 * @desc   Take a post object from API and return a normalize post object
 * @param  {ApiPost} post
 * @return {Post}
 */
export function normalizePost(post) {
  return {
    id: post.id,
    categoryId: post.category_id,
    title: post.name,
    description: post.tagline,
    createdAt: post.created_at,
    link: post.discussion_url,
    votes: post.votes_count,
    topics: post.topics.map(normalizeTopic),
    thumbnail: post.thumbnail.image_url,
  };
}

/**
 * @name   normalizeTopic
 * @desc   Take a topic object from API and return a normalize topic object
 * @param  {ApiTopic} topic
 * @return {Topic}
 */
export function normalizeTopic({ name, ...rest }) {
  return { ...rest, title: name };
}
