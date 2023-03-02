import type { HasId } from '@/types/models/HasId';

export const findItem = <T extends HasId>(id: string, items: T[]): T => items.find((item) => item.id === id)!;
