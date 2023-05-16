import { ref } from 'vue';

import { getRandomItem } from '@/helpers/getRandomItem';

export function useMessage(messages: string[]) {
  const currentMessages = ref(getRandomItem(messages));

  return currentMessages.value;
}
