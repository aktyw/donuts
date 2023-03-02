import type { HasId } from '@/types/models/HasId';

export const findIndex = <T extends HasId>(id: string, items: T[]): number => {
  return items.findIndex((item) => item.id === id);
};
