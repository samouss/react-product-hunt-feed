export function byId(state, items) {
  return items.reduce((acc, item) => {
    return { ...acc, [item.id]: item };
  }, state);
}

export function getIds(state, items) {
  return state.concat(items.map(item => item.id));
}

export function post(post) {
  return {
    id: post.id,
    categoryId: post.category_id,
    title: post.name,
    description: post.tagline,
    createdAt: post.created_at,
    link: post.discussion_url,
    votes: post.votes_count,
    topics: post.topics.map(topic),
    thumbnail: post.thumbnail.image_url,
  };
}

export function topic({ name, ...rest }) {
  return { ...rest, title: name };
}

export function category(category) {
  return {
    id: category.id,
    title: category.name,
    color: category.color,
  };
}
