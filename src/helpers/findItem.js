export const findItem = (id, store) => {
  return store.find((item) => item.id === id);
};
