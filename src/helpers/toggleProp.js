export const toggleProp = (id, prop, items) => {
  const index = items.findIndex((item) => item.id === id);
  items[index][prop] = !items[index][prop];
};
