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
    topics: post.topics.map(({ name, ...rest }) => {
      return { ...rest, title: name };
    }),
    thumbnail: post.thumbnail.image_url,
  };
}
