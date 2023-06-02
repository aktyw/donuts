import gsap from 'gsap';
import { reactive, ref, watch } from 'vue';

export function useAnimateNumbers() {
  const number = ref(0);
  const tweened = reactive({
    number: 0,
  });

  watch(number, (n) => {
    gsap.to(tweened, { duration: 0.5, number: Number(n) || 0 });
  });

  return { tweened };
}
