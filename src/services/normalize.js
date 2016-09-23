export function byId(state, items) {
  return items.reduce((acc, item) => {
    return { ...acc, [item.id]: item };
  }, state);
}

export function getIds(state, items) {
  return state.concat(items.map(item => item.id));
}
