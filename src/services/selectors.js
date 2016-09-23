export function getPost(state, id) {
  return state.postById[id];
}

export function getCategory(state, id) {
  return state.categoryById[id];
}

export function getPostWithCategory(state, post) {
  return { ...post, category: getCategory(state, post.categoryId) };
}

export function getPostsWithCategory(state) {
  return state.postIds.map(id => {
    return getPostWithCategory(state, getPost(state, id));
  });
}
