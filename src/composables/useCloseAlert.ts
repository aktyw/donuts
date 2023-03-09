import type { Ref } from 'vue';
import type { Alerts } from '@/types/models/Alerts';

export function closeAlert(alert: Ref<Alerts>) {
  alert.value = !alert.value;
}
