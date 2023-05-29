import { getBreakpoints } from '@/composables/useBreakpoints';

const { mdAndSmaller } = getBreakpoints();

import { useSettingsStore } from '@/stores/SettingsStore';

export function useHideMenu() {
  const settingsStore = useSettingsStore();

  if (!mdAndSmaller.value) return;
  settingsStore.hideMenu();
}
