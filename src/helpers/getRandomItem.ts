export function getRandomItem<T>(arr: T[]): T | undefined {
  const randomIndex = Math.floor(Math.random() * arr.length);

  return arr[randomIndex];
}
